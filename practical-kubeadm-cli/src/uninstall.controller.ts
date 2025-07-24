import { Injectable } from '@nestjs/common';

@Injectable()
export class UninstallController {
  async main(): Promise<void> {
    console.log('Uninstalling Kubernetes components...');
  }
}