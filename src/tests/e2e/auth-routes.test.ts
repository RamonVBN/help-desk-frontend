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
    await page.fill('input[name="email"]', "teste@gmail.com")
    await page.fill('input[name="password"]', "123456")
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL("http://localhost:3000/sign-in");
})

test("Sign-in page", async ({ page, context }) => {

  await page.route("**/api/sessions", async (route) => {
    console.log('Intercepted request to /sessions');
    return await route.fulfill({
        status: 200,
        headers: {
            "Set-Cookie": "access_token=fake-token-123; HttpOnly; Path=/;",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: true }),
    })
  });

  await page.goto("http://localhost:3000/sign-in");

  await page.fill('input[name="email"]', "teste@gmail.com");
  await page.fill('input[name="password"]', "123456");

  await page.click('button[type="submit"]');

//   espera a request de login finalizar
//   await page.waitForResponse("http://localhost:3000/api/sessions");

  // adiciona cookie DEPOIS do login
    await context.addCookies([
    {
        name: "access_token",
        value:
        "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4ifQ.fake-signature",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    },
    ]);

  // navega manualmente
  await page.goto("http://localhost:3000/calleds");

  await expect(page).toHaveURL("http://localhost:3000/calleds");
});