import test, { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";


test('Calleds page', async ({ context, page }) => {

    await context.addCookies([{
        name: 'access_token',
        value: 'fake-token-123',
        domain: 'localhost',
        path: '/',
    }])

    await page.route("**/calleds/*", async (route) => {
        const type = route.request().resourceType()

        if (type === 'document' || 'image') {
            
            return route.continue()
        }

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                called: {
                        id: '1',
                        title: 'Teste Mock',
                        description: 'Testando',
                        status: 'OPEN',
                        createdAt: '2025-08-28T05:30:32.868Z',
                        updatedAt: '2025-08-28T05:30:32.868Z',
                        service: {
                            id: '1',
                            name: 'Serviço de teste',
                            price: 19,
                            status: 'INACTIVE',
                        },
                        client: {
                            id: '1',
                            name: 'Cliente da Silva',
                            email: 'client@test.com',
                            imageUrl: null,
                        },

                        technician: {
                            id: '1',
                            name: 'Técnico Oliveira',
                            email: 'tech@test.com',
                            imageUrl: null,
                        },

                        additionalServices: [
                            {
                                id: '1',
                                description: 'Descrição de teste',
                                price: 10,
                            }
                        ]
                }
            }),
        })
    })

    await page.goto('http://localhost:3000')

    await expect(page.getByText("Ramon", { exact: true })).toBeVisible()
    await expect(page.getByText("ramon@teste.com")).toBeVisible()

    const row = page.locator("table tbody tr")
    await expect(row.first()).toBeVisible()

    const editButton = row.getByRole('button')
    await editButton.click()
    await expect(page).toHaveURL("/calleds/1")

})

test('Calleds Details page', async ({ context, page }) => {

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
                    role: 'ADMIN',
                    imageUrl: null,
                    availableHours: [],
                }
            }),
        })
    })

    await page.route(`**/calleds/*`, async (route) => {
        const type = route.request().resourceType()

        if (type === 'document' || type === 'image') {
            return route.continue()
        }

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                called: {
                        id: '1',
                        title: 'Teste Mock',
                        description: 'Testando',
                        status: 'OPEN',
                        createdAt: '2025-08-28T05:30:32.868Z',
                        updatedAt: '2025-08-28T05:30:32.868Z',
                        service: {
                            id: '1',
                            name: 'Serviço de teste',
                            price: 19,
                            status: 'INACTIVE',
                        },
                        client: {
                            id: '1',
                            name: 'Cliente da Silva',
                            email: 'client@test.com',
                            imageUrl: null,
                        },

                        technician: {
                            id: '1',
                            name: 'Técnico Oliveira',
                            email: 'tech@test.com',
                            imageUrl: null,
                        },

                        additionalServices: [
                            {
                                id: '1',
                                description: 'Descrição de teste',
                                price: 10,
                            }
                        ]
                }
            }),
        })
    })

    await page.goto('http://localhost:3000/calleds/1')

    await expect(page.getByText("Ramon", { exact: true })).toBeVisible()
    await expect(page.getByText("ramon@teste.com")).toBeVisible()

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
                    role: 'CLIENT',
                    imageUrl: null,
                }
            }),
        })
    })

    await page.route("**/services", async (route) => {
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

    await page.route("**/calleds", async (route) => {
        await route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify({success: true}),
        })
    })

    await page.goto('http://localhost:3000/calleds/new')

    await expect(page.getByText("Ramon", { exact: true })).toBeVisible()
    await expect(page.getByText("ramon@teste.com")).toBeVisible()
    await expect(page.getByText("CLIENTE")).toBeVisible()

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