//.getByRole("button", { name: "Add to Basket" }) -- не лучший вариант объявление элемента

// const addToBasket = page -- альтернативный способов декларации и обращения
//   .locator("div")
//   .filter({ hasText: /^599\$Add to Basket$/ })
//   .getByRole("button")
//   .first();
// await addToBasket.click();

//await page.pause(); -- чтобы держать страницу открытой

//await addToBasket.waitFor(); -- ожидание окончания теста с логами
