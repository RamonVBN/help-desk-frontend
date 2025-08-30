import test, { expect } from "@playwright/test";


test('Sign-up page', async ({ page }) => {

    await page.route("**/users", async (route) => {
        await route.fulfill({
            status: 201,
            body: JSON.stringify({ success: true }),
        })
    })

    await page.goto("http://localhost:3000/sign-up");

    await page.fill('input[name="name"]', "teste da silva")
    await page.fill('input[name="email"]', "teste@teste.com")
    await page.fill('input[name="password"]', "123456")
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL("http://localhost:3000/sign-in");
})

test('Sign-in page', async ({ page }) => {

    await page.route("**/sessions", async (route) => {
        await route.fulfill({
            status: 200,
            headers: {
                "Set-Cookie": "access_token=fake-token-123; HttpOnly; Path=/;",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ success: true }),
        })
    })

    await page.goto("http://localhost:3000/sign-in");

    await page.fill('input[name="email"]', "teste@teste.com")
    await page.fill('input[name="password"]', "123456")
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL("http://localhost:3000/calleds");
})