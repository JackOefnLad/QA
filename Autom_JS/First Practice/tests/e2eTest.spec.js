import { test, expect } from "@playwright/test";
import { ProductPage } from "../page-objects/ProductPage.js";
import { Navigation } from "../page-objects/Navigation.js";
import { Checkout } from "../page-objects/Checkout.js";

test.only("New user E2E test", async ({ page }) => {
  const productPage = new ProductPage(page); // Переменная pP это экземпляр класса PP с параметром page
  await productPage.visit();
  await productPage.addToBasket(0);
  await productPage.addToBasket(1);
  await productPage.addToBasket(4);

  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  //await page.pause();
});
