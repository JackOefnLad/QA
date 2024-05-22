import { expect } from "@playwright/test";

export class Blog {
  constructor(page) {
    this.page = page;
    this.blogSelect = page.getByRole("link", { name: "Блог Джесси" });
    this.article = page
      .getByRole("link", { name: "Давно просил домашнее животное" })
      .nth(1);
    this.photos = page.locator(".uk-grid-margin > div:nth-child(3)").first();
    this.arcadyi = page.getByRole("link", { name: "Аркадий" });
    this.footer = page.locator(".uk-grid-margin > div:nth-child(3)").first();
    this.backward = page.getByRole("link", { name: "Назад" });
    this.forward = page.getByRole("link", { name: "Вперед" });
    this.navigation = page.locator("ul").filter({ hasText: "Вперед" });
    this.artBtn = page.locator(".uk-margin-small-top > .el-link");
  }

  blog = async () => {
    await this.blogSelect.waitFor();
    await this.blogSelect.click();
    await this.page.goto("https://guru.qahacking.ru/index.php/news");
  };
  pickArticle = async () => {
    await this.article.focus();
    expect(await this.artBtn.first().isVisible()).toBe(true);
    await this.article.click();
    await this.navigation.focus();
    // await this.page.waitForURL(/\/news/);
    if (this.backward.isVisible()) {
      do {
        await this.navigation.scrollIntoViewIfNeeded();
        await this.forward.click();
      } while (await this.forward.isVisible());
    }
  };
  focusArcadyi = async () => {
    await this.page.mouse.wheel(0, 2200);
    await this.photos.focus();
    await this.arcadyi.click();
    await this.page.pause();
    await this.arcadyi.click({ delay: 5000 });
  };
}
