import { expect, test } from '@playwright/test'

test('List Orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()
})

test('Paginate Orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()
  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()
  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'Customer 51', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()
  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'Customer 41', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 50', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()
  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()
})

test.describe.parallel('Filter Orders', () => {
  test('Filter by Order Id', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' })

    await page.getByPlaceholder('ID do pedido').fill('order-11')
    await page.getByRole('button', { name: 'Filtrar Resultados' }).click()

    await page.waitForLoadState('networkidle')

    expect(
      page.getByRole('cell', { name: 'order-11', exact: true }),
    ).toBeVisible()
  })

  test('Filter by Customer Name', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' })

    await page.getByPlaceholder('Nome do Cliente').fill('Customer 11')
    await page.getByRole('button', { name: 'Filtrar Resultados' }).click()

    await page.waitForLoadState('networkidle')

    expect(
      page.getByRole('cell', { name: 'order-11', exact: true }),
    ).toBeVisible()
  })

  test('Filter by Order Status', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' })

    await page.getByRole('combobox').click()
    await page.getByLabel('Pendente').click()
    await page.getByRole('button', { name: 'Filtrar Resultados' }).click()

    await page.waitForLoadState('networkidle')

    const tableRows = await page.getByRole('cell', { name: 'Pendente' }).all()

    expect(tableRows).toHaveLength(10)
  })
})
