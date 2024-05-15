// import * as dotenv from "dotenv"; //импорт всего пакета
// dotenv.config(); //вызов/установка переменных окружения
import { test, expect } from "@playwright/test";
import { MyAccPage } from "../page-objects/Account";
import { getLoginToken } from "../api-calls/getLoginToken";
import { admintDetails } from "../data/loginDetail";

test("Cookies injection and mocking request", async ({ page }) => {
  //request for token
  const loginToken = await getLoginToken(
    admintDetails.username,
    admintDetails.password
  );

  await page.route(
    "**/api/user**" /* **- любые совпадения на месте звёзд*/,
    async (route, request) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Error for mocks" }),
      });
    }
  );

  //injection into browser
  const myAcc = new MyAccPage(page);
  await myAcc.visit();
  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = "token=" + loginTokenInsideBrowserCode;
    },
    [loginToken]
  );
  await myAcc.visit();
  await myAcc.waitingForHeader();
  await myAcc.waitForError();
});
