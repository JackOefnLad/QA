import { expect } from "@playwright/test";
import { isDesktop } from "../utilities/desktopView.js";

export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator("[data-qa=header-basket-count]");
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
    this.mobileDropdownButton = page.locator("[data-qa=burger-button]");
  }

  getBasketCounter = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckout = async () => {
    //check for mobile
    if (!isDesktop(this.page)) {
      await this.mobileDropdownButton.waitFor();
      await this.mobileDropdownButton.click();
    }

    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}
