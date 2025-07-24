import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstallController } from './install.controller';
import { UninstallController } from './uninstall.controller';
import { ControlPlaneController } from './control-plane.controller';
import { WorkerNodeController } from './worker-node.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    InstallController,
    UninstallController,
    ControlPlaneController,
    WorkerNodeController,
  ],
})
export class AppModule {}
