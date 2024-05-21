import { expect } from "@playwright/test";
import { user } from "../Data/user";

export class Main {
  constructor(page) {
    this.page = page;
    this.info = page.getByRole("link", { name: "Подробнее о питомнике" });
    this.footer = page
      .locator("div")
      .filter({
        hasText:
          "Подпишитесь на рассылку лучших фотографий Телефон питомника: +7-111-222-33-44",
      })
      .nth(1);
    this.email = page.getByPlaceholder("Email address");
    this.emailBtn = page.getByRole("button", { name: "Subscribe" });

    this.fullName = page.getByPlaceholder("Full Name");
    this.qEmail = page.getByPlaceholder("E-mail *");
    this.phone = page.getByPlaceholder("Mobile Phone");
    this.subject = page.getByPlaceholder("Subject");
    this.confBtn = page.getByRole("button", { name: "M Send" });

    this.message = page.getByText("No e-mail addresses (To) have");
  }

  visit = async () => {
    await this.page.goto("/");
  };

  aboutUs = async () => {
    await this.info.waitFor();
    await this.info.click();
    await this.page.goto("https://guru.qahacking.ru/index.php/about");
  };
  fillingSubscription = async () => {
    await this.footer.scrollIntoViewIfNeeded(this.footer);
    await this.footer.waitFor();

    await this.email.waitFor();
    await this.email.fill("test@test.com");
    await this.emailBtn.waitFor();
    const request = await this.emailBtn.click();
    if (request) {
      const statusCode = await request.headerValue("Status Code");
      console.log(`Status Code: ${statusCode}`);
    } else {
      console.log("Request object is undefined");
    }
  };
  fillingQuestion = async () => {
    await this.fullName.waitFor();
    await this.qEmail.waitFor();
    await this.phone.waitFor();
    await this.subject.waitFor();
    await this.confBtn.waitFor();

    await this.fullName.fill(user.fullName);
    await this.qEmail.fill(user.email);
    await this.phone.fill(user.phone);
    await this.subject.fill(user.subject);

    await this.confBtn.click();
    expect(this.message).toBeVisible();
  };
}
