import { calledsList } from "@/mocks/calleds";
import { adminCookies } from "@/mocks/cookies";
import { adminUser } from "@/mocks/users";
import test, { expect } from "@playwright/test";


test('Sign-up page', async ({ page }) => {

    await page.route("**/users", async (route) => {
        await route.fulfill({
            status: 201,
            body: JSON.stringify({ success: true }),
        })
    })

    await page.goto("/sign-up");

    await page.fill('input[name="name"]', "teste da silva")
    await page.fill('input[name="email"]', "teste@gmail.com")
    await page.fill('input[name="password"]', "123456")
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL("/sign-in");
})

test("Sign-in page", async ({ page, context }) => {

  await page.route("**/api/sessions", async (route) => {

    await context.addCookies([
      adminCookies
    ])

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
      }),
    })
  })

  await page.route("**/users/me", async (route) => {
    await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
            user: adminUser
        }),
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

  await page.goto("/sign-in")

  await page.fill('input[name="email"]', "teste@gmail.com")
  await page.fill('input[name="password"]', "123456")

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL("/calleds")
})