import * as fse from 'fs-extra';
import { Injectable } from '@nestjs/common';
import { Spawn } from 'src/child-processes/spawn.class';
import { logHeadline, logParagraph } from 'src/log.functions';
import { stopExecution } from '../core.functions';
import { TodoListLogger } from 'src/todolist.logger.class';
import { installContainerdTodolist } from './todolist-initializations';

const MODULES = `
overlay
br_netfilter
`;

const sysctlConfig = `# Containerd required modules
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
`;

@Injectable()
export class HandleContainerdService {
  public async mainSetupContainerd(): Promise<void> {
    installContainerdTodolist.showInterface();
    Spawn.aptUpdate();
  }
}
