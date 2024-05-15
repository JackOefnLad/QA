import { test, expect } from "@playwright/test";
import { MyAccPage } from "../page-objects/Account";
import { getLoginToken } from "../api-calls/getLoginToken";

test.only("Cookies inj", async ({ page }) => {
  //request for token
  const loginToken = await getLoginToken();
  console.warn({ loginToken });
  //injection into browser
  const myAcc = new MyAccPage(page);
  await myAcc.visit();
  //   await page.evaluate(() => {
  //     document.cookie = `token= ${loginToken}`;
  //   });
  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = "token=" + loginTokenInsideBrowserCode;
    },
    [loginToken]
  );
  await myAcc.visit();
  await myAcc.waitingForHeader();
});
