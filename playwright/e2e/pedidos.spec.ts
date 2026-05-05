import { test, expect } from '@playwright/test';
/// AAA - Arrange - Act - Assert
test('deve consultar um pedido aprovado', async ({ page }) => {

  //Test Data
  const order = 'VLO-KLWCX6'
  
  //Arrange
  await page.goto('http://localhost:5173/');
  await page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' }).click();
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByTestId('search-order-id').fill(order);
  await page.getByTestId('search-order-button').click();
  //await page. locator('//button[text()="Buscar Pedido"]'). click()

  //Assert
  await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000});
  await expect(page.getByTestId('order-result-id')).toContainText(order);
  await expect(page.getByTestId('order-result-status')).toBeVisible({timeout: 10000})
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});

test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

  //Test Data
  const order = 'ABC-123'
  
  //Arrange
  await page.goto('http://localhost:5173/');
  await page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' }).click();
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByTestId('search-order-id').fill(order);
  await page.getByTestId('search-order-button').click();
  //await page. locator('//button[text()="Buscar Pedido"]'). click()

  //Assert
  //await expect(page.locator('#root')). toContainText('Pedido não encontrado');
  //await expect(page.locator( '#root')). toContainText( 'Verifique o número do pedido e tente novamente');
  
  //const title = page.getByRole('heading', {name: "Pedido não encontrado"});
  //await expect(title). toBeVisible();
  //const message = page. locator('//p[text()="Verifique o número do pedido e tente novamente"]');
  //const message = page. locator ('p', {hasText: "Verifique o número do pedido e tente novamente"})
  //await expect(message). toBeVisible();

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
  `) ;
});