import { test, expect } from '@playwright/test';

test('Login with all provided usernames', async ({ page }) => {

  // List of usernames shown on the page
  const usernames = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
    "error_user",
    "visual_user"
  ];

  const password = "secret_sauce";

  // Loop through usernames
  for (const user of usernames) {
    console.log(`Testing login with: ${user}`);

    await page.goto("https://www.saucedemo.com/");

    await page.fill('[data-test="username"]', user);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');

    // Validate result
    if (user === "locked_out_user") {
      // Expected to see error
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      console.log(`${user} is locked out (as expected)`);
    } else {
      // Others should reach inventory page
      await page.waitForURL("**/inventory.html");
      await expect(page.locator('.inventory_list')).toBeVisible();
      console.log(`${user} logged in successfully`);

      // Logout to continue with next user
      await page.click('#react-burger-menu-btn');
      await page.click('#logout_sidebar_link');
    }
  }
});
