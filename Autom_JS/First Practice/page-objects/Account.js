import { expect } from "@playwright/test";

export class MyAccPage {
  constructor(page) {
    this.page = page;
    this.accountHeader = page.getByRole("heading", { name: "My Account" });
    this.error = page.locator("[data-qa=error-message]");
  }
  visit = async () => {
    await this.page.goto("/my-account");
  };
  waitingForHeader = async () => {
    await this.accountHeader.waitFor();
  };

  waitForError = async () => {
    await this.error.waitFor();
  };
}
