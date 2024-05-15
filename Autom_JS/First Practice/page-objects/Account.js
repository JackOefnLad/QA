import { expect } from "@playwright/test";

export class MyAccPage {
  constructor(page) {
    this.page = page;
    this.accountHeader = page.getByRole("heading", { name: "My Account" });
  }
  visit = async () => {
    await this.page.goto("/my-account");
  };
  waitingForHeader = async () => {
    await this.accountHeader.waitFor();
  };
}
