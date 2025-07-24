import { Module } from '@nestjs/common';
import { InstallController } from './install.controller';
import { UninstallController } from './uninstall.controller';
import { ControlPlaneController } from './control-plane.controller';
import { WorkerNodeController } from './worker-node.controller';
import { CheckComputerService } from './install/check-computer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    InstallController,
    UninstallController,
    ControlPlaneController,
    WorkerNodeController,
    CheckComputerService,
  ],
})
export class AppModule {}
