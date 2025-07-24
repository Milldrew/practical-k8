import { Injectable } from '@nestjs/common';

@Injectable()
export class ControlPlaneController {
  async createMain(): Promise<void> {
    console.log('Creating control plane node...');
  }

  async revertMain(): Promise<void> {
    console.log('Reverting control plane node...');
  }
}