import { Injectable } from '@nestjs/common';
import { CheckComputerService } from './install/check-computer.service';

@Injectable()
export class InstallController {
  constructor(private checkComputerService: CheckComputerService) {}
  async main(): Promise<void> {
    console.log(
      'Installing kubeadm following https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/ instructions.',
    );
    this.checkComputerService.main();
  }
}

