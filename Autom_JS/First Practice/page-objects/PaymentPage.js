import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discoutCode = page
      .frameLocator("[data-qa=active-discount-container]")
      .locator("[data-qa=discount-code]");
    this.discoutInput = page.getByPlaceholder("Discount code");
    //this.codeInput = page.locator("[data-qa=discount-code-input]");
    this.activateDiscountButton = page.locator(
      "[data-qa=submit-discount-button]"
    );
    this.discoutMessage = page.getByText("Discount activated!");
    this.fullPrice = page.locator("[data-qa=total-value]");
    this.discoutPrice = page.locator("[data-qa=total-with-discount-value]");

    this.creditCardOwner = page.locator("[data-qa=credit-card-owner]");
    this.creditCardNum = page.locator("[data-qa=credit-card-number]");
    this.creditDate = page.locator("[data-qa=valid-until]");
    this.creditCVC = page.locator("[data-qa=credit-card-cvc]");
    this.payButton = page.locator("[data-qa=pay-button]");
  }
  activateDiscount = async () => {
    await this.discoutCode.waitFor();
    const code = await this.discoutCode.innerText();
    await this.discoutInput.waitFor();
    // -- My way
    // await this.codeInput.waitFor(); ++
    // await this.codeInput.fill(code); ++
    // expect(await this.codeInput).toHaveValue(await this.discoutCode); --

    // -- 1st way
    await this.discoutInput.fill(code);
    await expect(this.discoutInput).toHaveValue(code);

    // // -- 2nd way
    // //For input we need to focus on field
    // await this.discoutInput.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discoutInput.inputValue()).toBe(code);

    expect(await this.discoutMessage.isVisible()).toBe(false);
    await this.activateDiscountButton.waitFor();
    await this.activateDiscountButton.click();
    await this.discoutMessage.waitFor();
    await this.discoutPrice.waitFor();
    // -- gross way
    await this.fullPrice.waitFor();
    const fullPriceText = await this.fullPrice.innerText();
    const fullPriceTextNum = fullPriceText.replace("$", "");
    const fullPriceNumber = parseInt(fullPriceTextNum, 10);

    await this.discoutPrice.waitFor();
    const discoutPriceText = await this.discoutPrice.innerText();
    const discoutPriceTextNum = discoutPriceText.replace("$", "");
    const discountIntNumber = parseInt(discoutPriceTextNum, 10);

    expect(discountIntNumber).toBeLessThan(fullPriceNumber);
  };
  fillDetails = async (paymentDetails) => {
    await this.creditCardOwner.waitFor();
    await this.creditCardOwner.fill(paymentDetails.owner);

    await this.creditCardNum.waitFor();
    await this.creditCardNum.fill(paymentDetails.number);

    await this.creditDate.waitFor();
    await this.creditDate.fill(paymentDetails.date);

    await this.creditCVC.waitFor();
    await this.creditCVC.fill(paymentDetails.CVC);
  };
  completePayment = async () => {
    await this.payButton.waitFor();
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  };
}
