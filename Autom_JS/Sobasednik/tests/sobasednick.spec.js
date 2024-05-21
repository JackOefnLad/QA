// @ts-check
const { test, expect } = require("@playwright/test");
import { Main } from "../Pages/main";
import { About } from "../Pages/About";

test.only("Sobasednick v2", async ({ page }) => {
  const main = new Main(page);
  await main.visit();
  await main.fillingSubscription();
  await main.fillingQuestion();
  await page.pause();
});

test(
  "Sobasednick",
  {
    annotation: {
      type: "E2E",
      description: "Sobasednick",
    },
  },
  async ({ page }) => {
    const main = new Main(page);
    await main.visit();
    await main.aboutUs();

    const form = new About(page);
    await form.fillForm();
    // await page.pause();
  }
);
