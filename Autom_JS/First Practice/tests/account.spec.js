// import * as dotenv from "dotenv"; //импорт всего пакета
// dotenv.config(); //вызов/установка переменных окружения
import { test, expect } from "@playwright/test";
import { MyAccPage } from "../page-objects/Account";
import { getLoginToken } from "../api-calls/getLoginToken";
import { admintDetails } from "../data/loginDetail";

test.only("Cookies inj", async ({ page }) => {
  //request for token
  const loginToken = await getLoginToken(
    admintDetails.username,
    admintDetails.password
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
});
