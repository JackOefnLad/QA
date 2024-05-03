import { expect } from "@playwright/test";
export class Login {
  constructor(page) {
    this.page = page;
    this.goRegister = page.locator("[data-qa=go-to-signup-button]");
  }

  moveToRegister = async () => {
    await this.goRegister.waitFor();
    await this.goRegister.click();
    this.page.waitForURL(/\/signup/, { timeout: 3000 });
  };
}
