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

  signUpNewUser = async (email, password) => {
    //let i = user[Math.floor(Math.random() * user.length)]; --попытка взять рандомный элемент из массива в data.json
    //With UUID
    // const emailId = uuidv4();
    // const pasId = uuidv4();
    // const email = emailId + "@gmail.com";

    await this.emailForm.waitFor();
    await this.emailForm.fill(email);

    await this.passwordForm.waitFor();
    await this.passwordForm.fill(password);

    //Form file
    //await this.emailForm.fill(user[2].email);
    //await this.passwordForm.fill(user[2].password);

    await this.regButton.waitFor();
    await this.regButton.click();
  };
}
