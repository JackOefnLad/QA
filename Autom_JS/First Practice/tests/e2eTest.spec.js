import { test, expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid"; //-- синтаксис для выбора объекта из указанного файла
import { ProductPage } from "../page-objects/ProductPage.js";
import { Navigation } from "../page-objects/Navigation.js";
import { Checkout } from "../page-objects/Checkout.js";
import { Login } from "../page-objects/Login.js";
import { SignUp } from "../page-objects/SignUp.js";
import { NewUser } from "../page-objects/NewUser.js";
import { userDetails } from "../data/userDetails.js";
import { PaymentPage } from "../page-objects/PaymentPage.js";

test.only("New user E2E test", async ({ page }) => {
  const productPage = new ProductPage(page); // Переменная pP это экземпляр класса PP с параметром page
  await productPage.visit();
  await productPage.sortByCheapest();

  await productPage.addToBasket(0);
  await productPage.addToBasket(1);
  await productPage.addToBasket(4);

  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueCheckout();
  //await page.pause();

  const login = new Login(page);
  await login.moveToRegister();

  const registerPage = new SignUp(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await registerPage.signUpNewUser(email, password);

  const userDet = new NewUser(page);
  await userDet.createUser(userDetails);

  await userDet.saveDetails();

  await userDet.continuePayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
});
