import { test, expect } from '@playwright/test';

test ('deve consultar um pedido aprovado', async ({ page }) => {
await page.goto('http://localhost:5173');
await expect (page.getByTestId('hero-section').getByRole('heading' )).toContainText('Velô Sprint')

await page. getByRole('link', { name: 'Consultar Pedido'}).click() 
await expect(page.getByRole('heading' )).toContainText('Consultar Pedido')

// Act
await page.getByRole('textbox', { name: 'Código do Pedido' }).fill('VLO-NXT8ZK')
await page.getByRole('button', { name: 'Buscar Pedido' }).click()

// Assert

const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-NXT8ZK"]')
await expect(orderCode).toBeVisible({timeout: 10_000})

const containerPedido = page.getByRole('paragraph')
  .filter({hasText: /^Pedido$/})
  .locator('..') //Sobe para o elemento pai (a div que agrupa ambos)

await expect(containerPedido).toContainText('VLO-NXT8ZK',{timeout: 10_000})

await expect (page.getByText('APROVADO')).toBeVisible()

})