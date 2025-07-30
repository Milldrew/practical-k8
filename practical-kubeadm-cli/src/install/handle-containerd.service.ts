import * as fse from 'fs-extra';
import { Injectable } from '@nestjs/common';
import { Spawn } from 'src/child-processes/spawn.class';
import { logHeadline, logParagraph } from 'src/log.functions';
import { stopExecution } from '../core.functions';

const MODULES = `
overlay
br_netfilter
`;

const sysctlConfig = `# Containerd required modules
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
`;

@Injectable()
export class HandleContainerdService {
  public async mainSetupContainerd(): Promise<void> {
    logHeadline('Setting up Containerd');
    this.setupSysctlConfig();
    this.installRequiredPackages();
    this.installContainerd();
    // this.setupModules();
    logHeadline('Finished setting up Containerd');

    // this.aptUpdate();
    // this.addContainerdRequiredModules();
  }
  private installContainerd(): void {
    logHeadline('Curling the GPG key for Containerd');

    Spawn.spawn(
      'curl',
      '-sSL',
      'https://packages.cloud.google.com/apt/doc/apt-key.gpg',
      '|',
      'sudo',
      'gpg',
      '--dearmor',
      '-o',
      '/usr/share/keyrings/cloud.google.gpg',
    );

    logHeadline('Adding the Containerd repository');

    Spawn.spawn(
      'echo',
      '"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null',
      '|',
      'sudo',
      'tee',
      '/etc/apt/sources.list.d/containerd-stable.list',
    );
    stopExecution(); // Debugger stop executio
    Spawn.aptUpdate();
    Spawn.aptInstall('docker-ce', 'docker-ce-cli', 'containerd.io');
  }

  private aptUpdate(): void {
    Spawn.aptUpdate();
  }
  private installRequiredPackages(): void {
    Spawn.aptInstall(
      'apt-transport-https',
      'curl',
      'gnupg',
      'lsb-release',
      'ca-certificates',
    );
  }
  private addContainerdRequiredModules(): void {
    Spawn.addContainerdRequiredModules();
  }

  private setupSysctlConfig(): void {
    const sysctlFilePath = '/etc/sysctl.d/k8s.conf';
    fse.ensureFileSync(sysctlFilePath);
    const currentFIleContent = fse.readFileSync(sysctlFilePath, 'utf8');
    logHeadline('sysctl configuration for Containerd');
    logParagraph(currentFIleContent);
    if (currentFIleContent.includes(sysctlConfig)) {
      return; // No need to append if already exists
    } else {
      logHeadline('Appending sysctl configuration for Containerd');
      fse.appendFileSync(sysctlFilePath, sysctlConfig);
    }
    Spawn.spawn('sudo', 'sysctl', '--system');
  }
  private setupModules(): void {
    const modulesFilePath = '/etc/modules-load.d/containerd.conf';
    fse.ensureFileSync(modulesFilePath);
    fse.writeFileSync(modulesFilePath, MODULES);
    Spawn.spawn('sudo', 'systemctl', 'restart', 'containerd');
  }
}
