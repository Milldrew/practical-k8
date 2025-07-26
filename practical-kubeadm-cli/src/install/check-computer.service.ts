import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { logHeadline, logParagraph, unorderedList } from 'src/log.functions';

@Injectable()
export class CheckComputerService {
  main() {
    logHeadline('Checking computer operating system and resources...');
    this.checkOperatingSystem();
    this.checkMemory();
    this.checkCPU();
    this.printRecommendedK8ControlPlaneResources();
  }

  checkOperatingSystem() {
    const platform = os.platform();
    unorderedList([`Operating System: ${platform}`]);
  }

  checkMemory() {
    const RAM = os.totalmem() / (1024 * 1024 * 1024); // Convert bytes to GB
    unorderedList([`Total RAM: ${RAM.toFixed(2)} GB`]);
  }
  cpu: string;
  checkCPU() {
    const cpus = os.cpus();
    unorderedList([
      `Number of logical CPUs: ${os.cpus().length}`,
      `CPU Model: ${cpus[0].model}`,
    ]);
  }
  printRecommendedK8ControlPlaneResources() {
    logParagraph(
      'Minimum recommended resources for a Kubernetes control plane node: 2 CPUs, 2 GB RAM.',
    );
  }
}
