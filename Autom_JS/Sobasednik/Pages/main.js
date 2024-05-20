import { expect } from "@playwright/test";

export class Main {
  constructor(page) {
    this.page = page;
    this.info = page.getByRole("link", { name: "Подробнее о питомнике" });
  }

  visit = async () => {
    await this.page.goto("/");
  };

  aboutUs = async () => {
    await this.info.waitFor();
    await this.info.click();
    await this.page.goto("https://guru.qahacking.ru/index.php/about");
  };
}
