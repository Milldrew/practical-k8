import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { Command } from 'commander';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appController = app.get(AppController);

  const program = new Command();
  
  program
    .name('practical-kubeadm')
    .description('CLI for managing Kubernetes clusters with kubeadm')
    .version('1.0.0');

  program
    .command('install')
    .description('Install Kubernetes components')
    .action(async () => {
      console.log('Installing Kubernetes components...');
      // TODO: Implement install logic
    });

  program
    .command('uninstall')
    .description('Uninstall Kubernetes components')
    .action(async () => {
      console.log('Uninstalling Kubernetes components...');
      // TODO: Implement uninstall logic
    });

  program
    .command('create-control-plane-node')
    .description('Create and configure control plane node')
    .action(async () => {
      console.log('Creating control plane node...');
      // TODO: Implement control plane creation logic
    });

  program
    .command('revert-control-plane-node')
    .description('Revert control plane node configuration')
    .action(async () => {
      console.log('Reverting control plane node...');
      // TODO: Implement control plane revert logic
    });

  program
    .command('create-worker-node')
    .description('Create and configure worker node')
    .argument('<worker-node-ip>', 'IP address of the worker node')
    .action(async (workerNodeIp: string) => {
      console.log(`Creating worker node at ${workerNodeIp}...`);
      // TODO: Implement worker node creation logic via SSH
    });

  program
    .command('revert-worker-node')
    .description('Revert worker node configuration')
    .argument('<worker-node-ip>', 'IP address of the worker node')
    .action(async (workerNodeIp: string) => {
      console.log(`Reverting worker node at ${workerNodeIp}...`);
      // TODO: Implement worker node revert logic via SSH
    });

  await program.parseAsync();
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
