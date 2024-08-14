import { expect, test } from '@playwright/test'

test('sign in sucessfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu Email').fill('jhondoe@example.com')

  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = await page.getByText(
    'Enviamos um link de autenticação para o email jhondoe@example.com',
  )

  expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu Email').fill('wrongemail@example.com')

  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = await page.getByText('Credenciais Invalidas')

  expect(toast).toBeVisible()
})

test('Navigate no new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
