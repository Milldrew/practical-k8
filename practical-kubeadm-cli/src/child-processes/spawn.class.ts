import * as fse from 'fs-extra';
import { spawn, spawnSync } from 'child_process';
import { logParagraph } from 'src/log.functions';

export class Spawn {
  static async createScriptExecuteScriptDeleteScript(
    scriptName: string,
    scriptContent: string,
  ): Promise<void> {
    const scriptPath = `/tmp/${scriptName}`;
    logParagraph(
      `Creating script at ${scriptPath} with content:\n${scriptContent}`,
    );
    await fse.writeFile(scriptPath, scriptContent);
    await fse.chmod(scriptPath, 0o755); // Make the script executable
    try {
      const result = await Spawn.spawnPromise(scriptPath);
      console.log(`Script executed successfully: ${result.code}`);
    } catch (error) {
      console.error(`Error executing script: ${error.message}`);
    } finally {
      // await fse.remove(scriptPath); // Delete the script after execution
    }
  }
  static aptUpdate(): void {
    const result = spawnWrapper('sudo', 'apt-get', 'update');
    if (result.error) {
      throw new Error(`Failed to update package list: ${result.error.message}`);
    }
    const resultUpgrade = spawnWrapper('sudo', 'apt-get', 'upgrade', '-y');
    if (resultUpgrade.error) {
      throw new Error(
        `Failed to upgrade packages: ${resultUpgrade.error.message}`,
      );
    }
  }
  static async aptInstall(...packages: string[]) {
    const result = await spawnPromiseWrapper(
      'sudo',
      'apt-get',
      'install',
      '-y',
      ...packages,
    ).catch((error) => {
      throw new Error(`Failed to install packages: ${error.message}`);
    });
  }
  static addContainerdRequiredModules(): void {
    const result = spawnWrapper('sudo', 'modprobe', 'overlay', 'br_netfilter');
    if (result.error) {
      throw new Error(
        `Failed to add containerd required modules: ${result.error.message}`,
      );
    }
  }
  static async spawnPromise(...args: string[]): Promise<{ code: number }> {
    console.log(1);
    return await spawnPromiseWrapper(...args).catch((error) => {
      throw new Error(`Failed to execute command: ${error.message}`);
    });
  }
  static spawnSync(...args: string[]) {
    const result = spawnWrapper(...args);
    if (result.error) {
      throw new Error(`Failed to execute command: ${result.error.message}`);
    }
    console.table(result);
    console.log(result.output);
    console.log(result.status);
    return result;
  }
}

function spawnWrapper(...args: string[]) {
  const [firstArg, ...restArgs] = args;
  return spawnSync(firstArg, restArgs, {
    stdio: 'inherit',
    shell: true,
  });
}
async function spawnPromiseWrapper(
  ...args: string[]
): Promise<{ code: number }> {
  console.log(1);
  return new Promise((resolve, reject) => {
    const child = spawn(args[0], args.slice(1), {
      stdio: 'pipe',
    });
    console.log(2);
    let output = '';
    let errorOutput = '';
    child.stdout.on('data', (data) => {
      console.log(3);
      console.log(`stdout: ${data}`);
      output += data.toString();
    });
    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    child.on('close', (code) => {
      console.log(`code: ${code}`);
      if (code !== 0) {
        reject(
          new Error(`Command failed with exit code ${code}: ${errorOutput}`),
        );
      } else {
        resolve({ code });
      }
    });
    child.on('error', (error) => {
      reject(new Error(`Failed to start command: ${error.message}`));
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });
}
