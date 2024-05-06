import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discoutCode = page
      .frameLocator("[data-qa=active-discount-container]")
      .locator("[data-qa=discount-code]");
    this.discoutInput = page.getByPlaceholder("Discount code");
    //this.codeInput = page.locator("[data-qa=discount-code-input]");
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
    // await this.discoutInput.fill(code);
    // await expect(this.discoutInput).toHaveValue(code);

    // -- 2nd way
    //For input we need to focus on field
    await this.discoutInput.focus();
    await this.page.keyboard.type(code, { delay: 1000 });

    await this.page.pause();
  };
}
