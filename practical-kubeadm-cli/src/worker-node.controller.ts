import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerNodeController {
  async createMain(workerNodeIp: string): Promise<void> {
    console.log(`Creating worker node at ${workerNodeIp}...`);
  }

  async revertMain(workerNodeIp: string): Promise<void> {
    console.log(`Reverting worker node at ${workerNodeIp}...`);
  }
}