import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000/";

test("should allow the user to log in", async ({ page }) => {
  await page.goto(UI_URL);
  await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();
  await page.getByLabel("Username");
  await page.selectOption('select[name="username"]', "Terrell (interviewee)");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(
    page.getByText(
      "This live chat sample app is made by Next.js, PubNub service."
    )
  ).toBeVisible();
});
