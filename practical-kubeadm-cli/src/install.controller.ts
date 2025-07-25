import { Injectable } from '@nestjs/common';
import { CheckComputerService } from './install/check-computer.service';
import { logHeadline, logParagraph } from './log.functions';

@Injectable()
export class InstallController {
  constructor(private checkComputerService: CheckComputerService) {}
  async main(): Promise<void> {
    logHeadline('Installing kubeadm');
    logHeadline('Installing kubeadm');
    logParagraph(
      'Installing kubeadm following URL: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/ ',
    );
    this.checkComputerService.main();
  }
}
