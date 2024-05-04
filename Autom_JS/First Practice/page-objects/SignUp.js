import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid"; //v4 as uuidv4 - переименование v4 в uuidv4

//const user = require("../data/user.json");/

export class SignUp {
  constructor(page) {
    this.page = page;
    this.emailForm = page.getByPlaceholder("E-Mail");
    this.passwordForm = page.getByPlaceholder("Password");
    this.regButton = page.getByRole("button", { name: "Register" });
  }

  signUpNewUser = async () => {
    //let i = user[Math.floor(Math.random() * user.length)];
    //With UUID
    await this.emailForm.waitFor();
    const emailId = uuidv4();
    const email = emailId + "@gmail.com";
    await this.emailForm.fill(email);

    await this.passwordForm.waitFor();
    const pasId = uuidv4();
    await this.passwordForm.fill(pasId);

    //Form file
    //await this.emailForm.fill(user[2].email);
    //await this.passwordForm.fill(user[2].password);

    await this.regButton.waitFor();
    await this.regButton.click();

    await this.page.pause();
  };
}
