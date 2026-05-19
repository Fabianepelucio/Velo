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
    //const order = 'VLO-NXT8ZK'

    const order = {
      number: 'VLO-NXT8ZK',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Fabiane de Lima Pelucio',
        email: 'fabianepelucio@yahoo.com.br',
      },
      payment: 'À Vista',
      status: 'APROVADO',
    }

    //Act
    await page.getByTestId('search-order-id').fill(order.number);
    await page.getByTestId('search-order-button').click();
    //await page. locator('//button[text()="Buscar Pedido"]'). click()

    //Assert
  //   await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000});
  //   await expect(page.getByTestId('order-result-id')).toContainText(order);
  //   await expect(page.getByTestId('order-result-status')).toBeVisible({timeout: 10000})
  //   await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
  // });
  await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
 `);
  await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text:  ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ [\\d.,]+/
  `);
  const statusBadge = page.getByRole('status').filter({hasText: order.status});
    await expect(statusBadge).toHaveClass(/bg-green-100/);
    await expect(statusBadge).toHaveClass(/text-green-700/);

  const statusIcon = statusBadge.locator('svg') 
    await expect(statusIcon).toHaveClass(/lucide-circle-check-big/);

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
  test('deve consultar um pedido reprovado', async ({ page }) => {

    //Test Data
   //const order = 'VLO-9L7T54'
    const order = {
      number: 'VLO-9L7T54',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com',
      },
      payment: 'À Vista',
      status: 'REPROVADO',
    }
    //Act
    await page.getByTestId('search-order-id').fill(order.number);
    await page.getByTestId('search-order-button').click();
    //await page. locator('//button[text()="Buscar Pedido"]'). click()

    //Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
    `);
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ [\\d.,]+/
  `);
  const statusBadge = page.getByRole('status').filter({hasText: order.status});
    await expect(statusBadge).toHaveClass(/bg-red-100/);
    await expect(statusBadge).toHaveClass(/text-red-700/);

  const statusIcon = statusBadge.locator('svg') 
    await expect(statusIcon).toHaveClass(/lucide-circle-x/);

  });
  test('deve consultar um pedido em análise', async ({ page }) => {

    //Test Data
   //const order = 'VLO-9L7T54'
    const order = {
      number: 'VLO-WJ4DZ3',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev',
      },
      payment: 'À Vista',
      status: 'EM_ANALISE',
    }
    //Act
    await page.getByTestId('search-order-id').fill(order.number);
    await page.getByTestId('search-order-button').click();
    //await page. locator('//button[text()="Buscar Pedido"]'). click()

    //Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
    `);
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ [\\d.,]+/
  `);
  const statusBadge = page.getByRole('status').filter({hasText: order.status});
    await expect(statusBadge).toHaveClass(/bg-amber-100/);
    await expect(statusBadge).toHaveClass(/text-amber-700/);

  const statusIcon = statusBadge.locator('svg') 
    await expect(statusIcon).toHaveClass(/lucide-clock/);
  });
});