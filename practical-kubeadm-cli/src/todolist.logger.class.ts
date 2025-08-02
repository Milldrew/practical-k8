export interface TodoItem {
  id: string;
  content: string;
  status: 'done' | 'not_done';
  createdAt?: Date;
  completedAt?: Date;
}

export class TodoListLogger {
  private todos: TodoItem[] = [];
  private name: string;

  constructor(todos: TodoItem[] = [], name: string = 'Default TodoList') {
    this.todos = todos;
    this.name = name;
  }

  updateTodoStatus(
    id: string,
    status: 'done' | 'not_done',
  ): boolean {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.status = status;
      if (status === 'done') {
        todo.completedAt = new Date();
      }
      this.renderTerminalInterface();
      return true;
    }
    return false;
  }

  showInterface(): void {
    this.renderTerminalInterface();
  }

  getTodos(): TodoItem[] {
    return [...this.todos];
  }

  getTodosByStatus(
    status: 'done' | 'not_done',
  ): TodoItem[] {
    return this.todos.filter((todo) => todo.status === status);
  }

  private renderTerminalInterface(): void {
    console.clear();

    const width = process.stdout.columns || 80;
    const line = '─'.repeat(width);
    const doubleLine = '═'.repeat(width);

    console.log(doubleLine);
    console.log(`${this.centerText(`📋 ${this.name.toUpperCase()}`, width)}`);
    console.log(doubleLine);

    const statusCounts = this.getStatusCounts();
    const summary = `Total: ${this.todos.length} | Not Done: ${statusCounts.not_done || 0} | Done: ${statusCounts.done || 0}`;
    console.log(`${this.centerText(summary, width)}`);
    console.log(line);

    if (this.todos.length === 0) {
      console.log(`${this.centerText('No todos yet. Add some tasks!', width)}`);
      console.log(line);
      return;
    }

    const notDoneTodos = this.getTodosByStatus('not_done');
    const doneTodos = this.getTodosByStatus('done');

    if (notDoneTodos.length > 0) {
      console.log('❌ NOT DONE:');
      notDoneTodos.forEach((todo) => this.renderTodoLine(todo));
      console.log(line);
    }

    if (doneTodos.length > 0) {
      console.log('✅ DONE:');
      doneTodos.forEach((todo) => this.renderTodoLine(todo));
      console.log(line);
    }

    console.log(
      `${this.centerText(`Last updated: ${new Date().toLocaleTimeString()}`, width)}`,
    );
    console.log(doubleLine);
  }

  private renderTodoLine(todo: TodoItem): void {
    const statusIcon = this.getStatusIcon(todo.status);

    console.log(`  ${statusIcon} ${todo.content} \x1b[90m(${todo.id})\x1b[0m`);
  }

  private centerText(text: string, width: number): string {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getStatusCounts(): Record<string, number> {
    return this.todos.reduce(
      (counts, todo) => {
        counts[todo.status] = (counts[todo.status] || 0) + 1;
        return counts;
      },
      {} as Record<string, number>,
    );
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'not_done':
        return '❌';
      case 'done':
        return '✅';
      default:
        return '❓';
    }
  }
}
