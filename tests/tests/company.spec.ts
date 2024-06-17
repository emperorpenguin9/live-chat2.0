import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // Locate the select element
  const selectElement = page.locator("#user-role");

  // Select the option with the text 'Editor'
  await selectElement.selectOption({ label: "Aaron (company)" });

  await page.getByRole("button", { name: "Log in" }).click();
});

test("should render company details", async ({ page }) => {
  await page.getByLabel("Company's Interface");
  await page.getByLabel("Logged in as: ");
});

test("should send a message", async ({ page }) => {
  const messageInput = page.getByPlaceholder("Send message");

  const sendButton = page.locator(".pn-msg-input__send");

  await messageInput.fill("From an interviewer");
  await sendButton.click();
  // Check if the message is sent
  await expect(page.locator(".pn-msg-list")).toContainText(
    "From an interviewer"
  );
});
