import { test, expect } from '@playwright/test';
import {generateOrderCode} from '../support/helpers';

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' }).click();
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  })

  // test.beforeAll(async () => {
  //   console.log(
  //     'beforeAll: roda uma vez antes de todos os testes.'
  //   )
  // })
  // test.afterEach(async () => {
  //   console.log(
  //     'afterEach: roda depois de cada teste.'
  //   )
  // })
  //  test. afterAll(async () => {
  //  console.log(
  //   'afterAll: roda uma vez depois de todos os testes.'
  //  )
  // })

  /// AAA - Arrange - Act - Assert
  test('deve consultar um pedido aprovado', async ({ page }) => {

    //Test Data
    const order = 'VLO-NXT8ZK'

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
    const order = generateOrderCode();

    //Act
    await page.getByTestId('search-order-id').fill(order);
    await page.getByTestId('search-order-button').click();
    //await page. locator('//button[text()="Buscar Pedido"]'). click()

    //Assert
    //await expect(page.locator('#root')). toContainText('Pedido não encontrado');
    //await expect(page.locator( '#root')). toContainText( 'Verifique o número do pedido e tente novamente');

    //const title = page.getByRole('heading', {name: "Pedido não encontrado"});
    //await expect(title).toBeVisible();
    //const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]');
    //const message = page.locator ('p', {hasText: "Verifique o número do pedido e tente novamente"})
    //await expect(message).toBeVisible();

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
    `);
  });

});