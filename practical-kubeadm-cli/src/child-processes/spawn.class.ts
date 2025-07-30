import { spawnSync } from 'child_process';

export class Spawn {
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
  static aptInstall(...packages: string[]): void {
    const result = spawnWrapper(
      'sudo',
      'apt-get',
      'install',
      '-y',
      ...packages,
    );
    if (result.error) {
      throw new Error(`Failed to install packages: ${result.error.message}`);
    }
  }
  static addContainerdRequiredModules(): void {
    const result = spawnWrapper('sudo', 'modprobe', 'overlay', 'br_netfilter');
    if (result.error) {
      throw new Error(
        `Failed to add containerd required modules: ${result.error.message}`,
      );
    }
  }
  static spawn(...args: string[]): void {
    const result = spawnWrapper(...args);
    if (result.error) {
      throw new Error(`Failed to execute command: ${result.error.message}`);
    }
  }
}

function spawnWrapper(...args: string[]) {
  const [firstArg, ...restArgs] = args;
  return spawnSync(firstArg, restArgs, {
    stdio: 'inherit',
    shell: true,
  });
}
