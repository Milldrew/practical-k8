import { Injectable } from '@nestjs/common';

@Injectable()
export class InstallController {
  async main(): Promise<void> {
    console.log('Installing Kubernetes components...');
  }
}