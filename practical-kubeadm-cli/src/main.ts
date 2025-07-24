import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InstallController } from './install.controller';
import { UninstallController } from './uninstall.controller';
import { ControlPlaneController } from './control-plane.controller';
import { WorkerNodeController } from './worker-node.controller';
import { Command } from 'commander';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const installController = app.get(InstallController);
  const uninstallController = app.get(UninstallController);
  const controlPlaneController = app.get(ControlPlaneController);
  const workerNodeController = app.get(WorkerNodeController);

  await installController.main();

  // const program = new Command();

  // program
  //   .name('practical-kubeadm')
  //   .description('CLI for managing Kubernetes clusters with kubeadm')
  //   .version('1.0.0');

  // program
  //   .command('install')
  //   .description('Install Kubernetes components')
  //   .action(async () => {
  //     await installController.main();
  //   });

  // program
  //   .command('uninstall')
  //   .description('Uninstall Kubernetes components')
  //   .action(async () => {
  //     await uninstallController.main();
  //   });

  // program
  //   .command('create-control-plane-node')
  //   .description('Create and configure control plane node')
  //   .action(async () => {
  //     await controlPlaneController.createMain();
  //   });

  // program
  //   .command('revert-control-plane-node')
  //   .description('Revert control plane node configuration')
  //   .action(async () => {
  //     await controlPlaneController.revertMain();
  //   });

  // program
  //   .command('create-worker-node')
  //   .description('Create and configure worker node')
  //   .argument('<worker-node-ip>', 'IP address of the worker node')
  //   .action(async (workerNodeIp: string) => {
  //     await workerNodeController.createMain(workerNodeIp);
  //   });

  // program
  //   .command('revert-worker-node')
  //   .description('Revert worker node configuration')
  //   .argument('<worker-node-ip>', 'IP address of the worker node')
  //   .action(async (workerNodeIp: string) => {
  //     await workerNodeController.revertMain(workerNodeIp);
  //   });

  // await program.parseAsync();
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
