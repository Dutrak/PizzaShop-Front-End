import { expect, test } from '@playwright/test'

test('sign in sucessfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu Email').fill('jhondoe@example.com')

  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  await expect(
    page.getByText(
      'Enviamos um link de autenticação para o email jhondoe@example.com',
      { exact: true },
    ),
  ).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu Email').fill('wrongemail@example.com')

  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  await expect(
    page.getByText('Credenciais Invalidas', { exact: true }),
  ).toBeVisible()
})

test('Navigate no new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
