import { Module } from '@nestjs/common';
import { InstallController } from './install.controller';
import { UninstallController } from './uninstall.controller';
import { ControlPlaneController } from './control-plane.controller';
import { WorkerNodeController } from './worker-node.controller';
import { CheckComputerService } from './install/check-computer.service';
import { CheckNetworkAdaptersService } from './install/check-network-adapters.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    InstallController,
    UninstallController,
    ControlPlaneController,
    WorkerNodeController,
    CheckComputerService,
    CheckNetworkAdaptersService,
  ],
})
export class AppModule {}
