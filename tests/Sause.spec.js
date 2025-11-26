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

 
  for (const user of usernames) {
    console.log(`Testing login with: ${user}`);

    await page.goto("https://www.saucedemo.com/");

    await page.fill('[data-test="username"]', user);             // Fill in username field with current username
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');

   
    if (user === "locked_out_user") {
   
      await expect(page.locator('[data-test="error"]')).toBeVisible(); // Verify error message is shown
      console.log(`${user} is locked out (as expected)`);
    } else {
      
      await page.waitForURL("**/inventory.html");                 // Wait for navigation to inventory page
      await expect(page.locator('.inventory_list')).toBeVisible();
      console.log(`${user} logged in successfully`);

     
      await page.click('#react-burger-menu-btn');   // Perform logout
      await page.click('#logout_sidebar_link');
    }
  }
});
