import { Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly newTodo: Locator;
  readonly todoItems: Locator;
  readonly clearCompletedButton: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;

  constructor(private readonly page: Page) {
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.activeFilter = page.getByRole('link', { name: 'Active' });
    this.completedFilter = page.getByRole('link', { name: 'Completed' });
  }

  async open(): Promise<void> {
    await this.page.goto('');
  }

  async addTask(task: string): Promise<void> {
    await this.newTodo.fill(task);
    await this.newTodo.press('Enter');
  }

  async completeTask(task: string): Promise<void> {
    const item = this.todoItems.filter({ hasText: task });
    await item.getByRole('checkbox').check();
  }
}
