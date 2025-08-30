import test, { expect } from "@playwright/test";

test('Profile modal', async ({page, context}) => {

     await context.addCookies([{
        name: 'access_token',
        value: 'fake-token-123',
        domain: 'localhost',
        path: '/',
    }])

    await page.route("**/users/me", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                user: {
                    id: 1,
                    name: "Ramon",
                    email: "ramon@teste.com",
                    role: 'TECHNICIAN',
                    imageUrl: null,
                    availableHours: ['7:00', '8:00', '9:00', '10:00', '11:00'],
                }
            }),
        })
    })

    await page.route("**/users/1", async (route) => {
        const request = route.request()
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({success: true}),
        })
    })

    await page.goto('http://localhost:3000/calleds')

    await expect(page.getByText("Ramon", { exact: true })).toBeVisible()
    await expect(page.getByText("ramon@teste.com")).toBeVisible()

    const username = page.getByText("Ramon", { exact: true })

    await username.click()

    const perfilButton = page.getByText("Perfil", { exact: true })

    await perfilButton.click()

    const changePasswordModalButton = page.getByText('Alterar', {exact: true})

    await expect(changePasswordModalButton).toBeVisible()

    await page.fill('input[name="name"]', "Ramon atualizado")
    await page.fill('input[name="email"]', "ramonatualizado@teste.com")
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