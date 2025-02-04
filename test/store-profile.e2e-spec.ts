import { expect, test } from '@playwright/test'

test('Update Profile Sucessfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Mock Restaurant' }).click()
  await page.waitForTimeout(1000)

  await page.getByText('Perfil da Loja').click()
  await page.waitForTimeout(1000)

  await page.getByLabel('Nome').fill('Pizza Shop')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await expect(
    page.getByText('Perfil Atualizado com sucesso', { exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'Pizza Shop' })).toBeVisible()
})
