import { calledsList } from "@/mocks/calleds";
import { techCookies } from "@/mocks/cookies";
import { techUser } from "@/mocks/users";
import test, { expect } from "@playwright/test";

test('Profile modal', async ({page, context}) => {

    await context.addCookies([
        techCookies
    ]);

    await page.route("**/users/me", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                user: techUser
            }),
        })
    })

    await page.route("**/users/1", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({success: true}),
        })
    })

    await page.route("**/api/calleds**", async (route) => {
        const type = route.request().resourceType()
    
        if (type === 'document' || type === 'image') {
            
            return route.continue()
        }
    
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                calleds: calledsList
            }),
        })
      })

    await page.goto('/calleds')

    await expect(page.getByText("teste", { exact: true })).toBeVisible()
    await expect(page.getByText("teste@gmail.com")).toBeVisible()

    const username = page.getByText("teste", { exact: true })

    await username.click()

    const perfilButton = page.getByText("Perfil", { exact: true })

    await perfilButton.click()

    const changePasswordModalButton = page.getByText('Alterar', {exact: true})

    await expect(changePasswordModalButton).toBeVisible()

    await page.fill('input[name="name"]', "teste atualizado")
    await page.fill('input[name="email"]', "testeatualizado@gmail.com")
    await page.click('button[type="submit"]')

    await expect(changePasswordModalButton).toBeHidden()

    await perfilButton.click()

    await changePasswordModalButton.click()

    const buttonToBack = page.locator('button svg[data-icon="arrow-left"]')

    await expect(buttonToBack).toBeVisible()

    await buttonToBack.click()

    expect(changePasswordModalButton).toBeVisible()

    await changePasswordModalButton.click()

    await page.fill('input[name="currentPassword"]', "senhaAtual")
    await page.fill('input[name="newPassword"]', "novaSenha")

    await page.click('button[type="submit"]')

    await expect(changePasswordModalButton).toBeHidden()
    await expect(buttonToBack).toBeHidden()
})