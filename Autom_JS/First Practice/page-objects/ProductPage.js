import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";

export class ProductPage {
  constructor(page) {
    this.page = page; //Для ProductPage присваивается страница
    this.addButtons = page.locator("[data-qa=product-button]");
    this.sortButton = page.locator("[data-qa=sort-dropdown]");
    this.productTitle = page.locator("[data-qa=product-title]");
  }
  visit = async () => {
    await this.page.goto("/");
  };

  // getBasketCounter = async () => {
  //   await this.basketCounter.waitFor();
  //   const text = await this.basketCounter.innerText();
  //   // const asNumber = parseInt(text, 10);
  //   // return asNumber;
  //   return parseInt(text, 10);
  // };

  addToBasket = async (index) => {
    //data-qa=product-button
    //const addButtons = this.addButtons;
    const specButton = this.addButtons.nth(index);
    await specButton.waitFor();
    await expect(specButton).toHaveText("Add to Basket"); //-- проверка текста

    const navigation = new Navigation(this.page); //--применение Navigation в данном классе
    const basketCounterBeforeAdding = await navigation.getBasketCounter();
    await specButton.click();
    await expect(specButton).toHaveText("Remove from Basket"); //-- проверка текста
    const basketCounterAfterAdding = await navigation.getBasketCounter();
    expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding);
  };

  sortByCheapest = async () => {
    await this.sortButton.waitFor();
    //order of products
    await this.productTitle.first().waitFor();
    const productBeforeSort = await this.productTitle.allInnerTexts();
    await this.sortButton.selectOption("price-asc");
    const productAfterSort = await this.productTitle.allInnerTexts();
    expect(productAfterSort).not.toEqual(productBeforeSort);
    await this.productTitle;
    //await this.page.pause();
  };
}
