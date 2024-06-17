import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("button", { name: "Log in" }).click();
});

test("should render interviewee details", async ({ page }) => {
  await page.getByLabel("Interviewee's Interface");
  await page.getByLabel("Logged in as: ");
});

test("should send a message", async ({ page }) => {
  const messageInput = page.getByPlaceholder("Send message");

  const sendButton = page.getByRole("button", { name: "send" });

  await messageInput.fill("Hello, this is a test message");
  await sendButton.click();
  // Check if the message is sent
  await expect(page.locator(".pn-msg-list")).toContainText(
    "Hello, this is a test message"
  );
});
