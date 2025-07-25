import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { logHeadline } from 'src/log.functions';

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
    console.log(`Operating System: ${platform}`);
  }

  checkMemory() {
    const RAM = os.totalmem() / (1024 * 1024 * 1024); // Convert bytes to GB
    console.log(`Total RAM: ${RAM.toFixed(2)} GB`);
  }
  checkCPU() {
    const cpus = os.cpus();
    console.log(`Number of CPU cores: ${cpus.length}`);
    console.log(`CPU Model: ${cpus[0].model}`);
  }
  printRecommendedK8ControlPlaneResources() {
    console.log('-----------------');
    console.log(
      'Minimum recommended resources for a Kubernetes control plane node: 2 CPUs, 2 GB RAM.',
    );
  }
}
