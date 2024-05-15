import { test, expect } from "@playwright/test";

test.skip("Product page add to basket", async ({ page }) => {
  await page.goto("/");
  const addToBasket = page.locator("[data-qa=product-button]").first();
  const basketCount = page.locator("[data-qa=header-basket-count]");

  await expect(addToBasket).toHaveText("Add to Basket");
  await expect(basketCount).toHaveText("0");

  await addToBasket.click();

  await expect(addToBasket).toHaveText("Remove from Basket");
  await expect(basketCount).toHaveText("1");

  const checoutLink = page.getByRole("link", { name: "Checkout" });
  await checoutLink.waitFor();
  await checoutLink.click();
  await page.waitForURL("/basket");
});
