import { TodoItem, TodoListLogger } from 'src/todolist.logger.class';

const UPDATED_AND_UPGRADED_APT: TodoItem = {
  id: 'updated-and-upgraded-apt',
  content: 'Update and upgrade apt packages',
  status: 'not_done',
};

const INSTALL_CONTAINERD: TodoItem = {
  id: 'install-containerd',
  content: 'Install containerd',
  status: 'not_done',
};
const SETUP_DEFAULT_CONFIG: TodoItem = {
  id: 'setup-default-config',
  content: 'Setup default containerd configuration',
  status: 'not_done',
};
const SETUP_SYSTEMD_C_GROUP_MODULES: TodoItem = {
  id: 'setup-systemd-cgroup-modules',
  content: 'Setup systemd cgroup modules',
  status: 'not_done',
};
const INSTALL_CONTAINERD_CLI: TodoItem = {
  id: 'install-containerd-cli',
  content: 'Install containerd CLI',
  status: 'not_done',
};
const TEST_CONTAINERD_WITH_CONTAINER_CLI: TodoItem = {
  id: 'test-containerd-with-container-cli',
  content: 'Test containerd with container CLI',
  status: 'not_done',
};
const SYSTEMD_C_GROUP_TRUE: TodoItem = {
  id: 'systemd-cgroup-true',
  content: 'Set systemd cgroup to true',
  status: 'not_done',
};
const PRINT_CONTAINERD_CONFIG: TodoItem = {
  id: 'print-containerd-config',
  content: 'Print containerd configuration',
  status: 'not_done',
};

const MAKE_SURE_CONTAINERD_CLI_IS_INSTALLED: TodoItem = {
  id: 'make-sure-containerd-cli-is-installed',
  content: 'Make sure containerd CLI is installed',
  status: 'not_done',
};
export const CONTAINERD_TODOLIST: TodoItem[] = [
  UPDATED_AND_UPGRADED_APT,
  INSTALL_CONTAINERD,
  MAKE_SURE_CONTAINERD_CLI_IS_INSTALLED,
  SETUP_DEFAULT_CONFIG,
  SETUP_SYSTEMD_C_GROUP_MODULES,
  INSTALL_CONTAINERD_CLI,
  TEST_CONTAINERD_WITH_CONTAINER_CLI,
  SYSTEMD_C_GROUP_TRUE,
];

export const installContainerdTodolist = new TodoListLogger(
  CONTAINERD_TODOLIST,
  'Containerd Installation Todo List',
);
