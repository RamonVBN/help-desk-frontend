import { called, calledsList } from "@/mocks/calleds";
import { adminCookies, clientCookies } from "@/mocks/cookies";
import { adminUser, clientUser } from "@/mocks/users";
import test, { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";


test('Calleds page', async ({ context, page }) => {

    await context.addCookies([
        adminCookies
    ]);

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

     await page.route("**/api/users/me", async (route) => {
        const type = route.request().resourceType()

        if (type === 'document' || type === 'image') {
            
            return route.continue()
        }

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
               user: adminUser
            }),
        })
    })

    await page.goto('/calleds')

    await expect(page.getByText("teste", { exact: true })).toBeVisible()
    await expect(page.getByText("teste@gmail.com")).toBeVisible()

    const row = page.locator("table tbody tr")
    await expect(row.first()).toBeVisible()

})

test('Calleds Details page', async ({ context, page }) => {

    await context.addCookies([
        adminCookies
    ]);

    await page.route("**/users/me", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                user: adminUser
            }),
        })
    })

    await page.route(`**/api/calleds/*`, async (route) => {
        const type = route.request().resourceType()

        if (type === 'document' || type === 'image') {
            return route.continue()
        }

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                called
            }),
        })
    })

    await page.goto('/calleds/1')

    await expect(page.getByText("teste", { exact: true })).toBeVisible()
    await expect(page.getByText("teste@gmail.com")).toBeVisible()

    await expect(page).toHaveURL("/calleds/1")

    const buttonToClose = page.getByRole('button').getByText('Encerrado')
    const buttonToProgress = page.getByRole('button').getByText('Em atendimento')
    const buttonToBack = page.getByRole('button').getByText('Voltar')

    await expect(buttonToClose).toBeVisible()
    await expect(buttonToProgress).toBeVisible()
    await expect(buttonToBack).toBeVisible()
    await expect(page.getByText('Chamado detalhado')).toBeVisible()

})

test('New Called page', async ({ context, page }) => {

    await context.addCookies([
        clientCookies
    ]);

    await page.route("**/users/me", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                user: clientUser
            }),
        })
    })

    await page.route("**/api/services", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                services: [
                    {
                    id: uuidv4(),
                    name: "Serviço de teste ativo 1",
                    price: 10,
                    status: "ACTIVE"
                    },
                    {
                    id: uuidv4(),
                    name: "Serviço de teste ativo 2",
                    price: 15,
                    status: "ACTIVE"
                    },
                    {
                    id: uuidv4(),
                    name: "Serviço de teste inativo",
                    price: 250,
                    status: "INACTIVE"
                    },
                ]
            }),
        })
    })

    await page.route("**/api/calleds**", async (route) => {
        const type = route.request().resourceType()

        if (route.request().method() !== 'GET') {
            return route.continue()
        }

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

    await page.route("**/api/calleds", async (route) => {

        const type = route.request().resourceType()

        if (route.request().method() !== 'POST') {
            return route.continue()
        }

        if (type === 'document' || type === 'image') {
            
            return route.continue()
        }


        await route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify({
                success: true,
            }),
        })
    })

    await page.goto('/calleds/new')

    await expect(page.getByText("teste", { exact: true })).toBeVisible()
    await expect(page.getByText("teste@gmail.com")).toBeVisible()

    await expect(page).toHaveURL("/calleds/new")    
    await expect(page.getByText('Novo chamado')).toBeVisible()

    await page.fill('input[name="title"]', 'Título de teste')
    await page.fill('textarea[name="description"]', 'Descrição de teste')
    await page.click('button[type="submit"]')

    await expect(page.getByText('Selecione uma categoria de serviço.')).toBeVisible()

    const select = page.getByText('Selecione a categoria de atendimento')

    await select.click()

    const options = page.getByRole("option")
    const optionsCount = await options.count()
    expect(optionsCount).toBe(2)

    await options.nth(1).click()

    await expect(page.getByTestId('selectedService')).toBeVisible()
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/calleds')
})