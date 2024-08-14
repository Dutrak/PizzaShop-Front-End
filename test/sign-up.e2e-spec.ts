import { expect, test } from '@playwright/test'

test('Navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer Login' }).click()

  expect(page.url()).toContain('/sign-in')
})

test('Sign up Sucessfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do Estabelecimento').fill('Pizza Shop')
  await page
    .getByLabel('Descrição Estabelecimento')
    .fill('A melhor pizza da cidade')
  await page.getByLabel('Seu Nome').fill('Jhon Doe')
  await page.getByLabel('Seu Email').fill('jhondoe@example.com')
  await page.getByLabel('Seu Celular').fill('11123132143')

  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  await page.waitForLoadState('networkidle')

  expect(page.getByText('Restaurante Cadastrado com sucesso')).toBeVisible()
})

test('Sign up With Errror', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do Estabelecimento').fill('Invalid Name')
  await page
    .getByLabel('Descrição Estabelecimento')
    .fill('A melhor pizza da cidade')
  await page.getByLabel('Seu Nome').fill('Jhon Doe')
  await page.getByLabel('Seu Email').fill('jhondoe@example.com')
  await page.getByLabel('Seu Celular').fill('11123132143')

  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  await page.waitForLoadState('networkidle')

  expect(page.getByText('Erro ao cadastrar Resturante')).toBeVisible()
})
