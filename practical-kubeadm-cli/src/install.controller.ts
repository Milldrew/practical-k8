import { Injectable } from '@nestjs/common';
import { CheckComputerService } from './install/check-computer.service';
import { logHeadline, logParagraph } from './log.functions';
import { CheckNetworkAdaptersService } from './install/check-network-adapters.service';

@Injectable()
export class InstallController {
  constructor(
    private checkComputerService: CheckComputerService,
    private checkNetworkAdaptersService: CheckNetworkAdaptersService,
  ) {}
  async main(): Promise<void> {
    logHeadline('Installing kubeadm');
    logHeadline('Installing kubeadm');
    logParagraph(
      'Installing kubeadm following URL: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/ ',
    );
    this.checkComputerService.main();
    this.checkNetworkAdaptersService.main();
  }
}
