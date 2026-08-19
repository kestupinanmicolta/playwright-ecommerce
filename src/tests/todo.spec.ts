import { expect, test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Gestión de tareas de compra', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
    await todoPage.addTask('Agregar portátil al carrito');
    await todoPage.addTask('Validar método de pago');
  });

  test('permite completar una tarea y verla en el filtro completado', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.completeTask('Agregar portátil al carrito');
    await todoPage.completedFilter.click();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toContainText('Agregar portátil al carrito');
  });

  test('mantiene pendientes separados de las tareas completadas', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.completeTask('Validar método de pago');
    await todoPage.activeFilter.click();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toContainText('Agregar portátil al carrito');
  });

  test('elimina las tareas completadas', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.completeTask('Agregar portátil al carrito');
    await todoPage.clearCompletedButton.click();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toContainText('Validar método de pago');
  });
});
