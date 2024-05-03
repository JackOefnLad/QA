import { expect } from "@playwright/test";

const user = require("../data/user.json");

export class SignUp {
  constructor(page) {
    this.page = page;
    this.emailForm = page.getByPlaceholder("E-Mail");
    this.passwordForm = page.getByPlaceholder("Password");
    this.regButton = page.getByRole("button", { name: "Register" });
  }

  signUpNewUser = async () => {
    await this.emailForm.waitFor();
    await this.emailForm.fill(user.email);

    await this.passwordForm.waitFor();
    await this.passwordForm.fill(user.password);

    await this.regButton.waitFor();
    await this.regButton.click();

    await this.page.pause();
  };
}
