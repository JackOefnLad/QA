import { expect } from "@playwright/test";

export class Checkout {
  constructor(page) {
    this.page = page;

    this.basketCard = page.locator("[data-qa=basket-card]");
    this.basketPrice = page.locator("[data-qa=basket-item-price]");
    this.basketItemRemove = page.locator("[data-qa=basket-card-remove-item]");
    this.contCheckout = page.locator("[data-qa=continue-to-checkout]");
  }

  removeCheapestProduct = async () => {
    await this.basketCard.first().waitFor();
    const itemsBeforeRemove = await this.basketCard.count();
    await this.basketPrice.first().waitFor();

    const allPriceText = await this.basketPrice.allInnerTexts(); //-- переменная, в которую записываются все строки цены

    //--- создание массива цен(int) из массива цен(string)
    const numPrice = allPriceText.map((element) => {
      const priceWithputDollar = element.replace("$", "");
      return parseInt(priceWithputDollar, 10);
    });
    //--- поиск самого дешевого товара
    const cheapestPrice = Math.min(...numPrice);
    const cheapestPriceIndex = numPrice.indexOf(cheapestPrice);
    const itemRemove = this.basketItemRemove.nth(cheapestPriceIndex);

    await itemRemove.waitFor();
    await itemRemove.click();
    await expect(this.basketCard).toHaveCount(itemsBeforeRemove - 1);
  };

  continueCheckout = async () => {
    await this.contCheckout.waitFor();
    await this.contCheckout.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
}
