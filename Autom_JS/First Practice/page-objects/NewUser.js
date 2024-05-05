import { expect } from "@playwright/test";

export class NewUser {
  constructor(page) {
    this.page = page;
    this.fName = page.locator("[data-qa=delivery-first-name]");
    this.lName = page.locator("[data-qa=delivery-last-name]");

    this.adressStreet = page.locator("[data-qa=delivery-address-street]");
    this.adressPostal = page.locator("[data-qa=delivery-postcode]");
    this.adressCity = page.locator("[data-qa=delivery-city]");
    this.country = page.locator("[data-qa=country-dropdown]");

    this.saveForNextButton = page.locator("[data-qa=save-address-button]");
    this.continuePaymentButton = page.locator(
      "[data-qa=continue-to-payment-button]"
    );
    this.saveBox = page.locator("[data-qa=saved-address-container]");

    //----------------Saving data
    this.savedFName = page.locator("[data-qa=saved-address-firstName]");
    this.savedLName = page.locator("[data-qa=saved-address-lastName]");
    this.savedStreet = page.locator("[data-qa=saved-address-street]");
    this.savedPostcode = page.locator("[data-qa=saved-address-postcode]");
    this.savedCity = page.locator("[data-qa=saved-address-city]");
    this.savedCountry = page.locator("[data-qa=saved-address-country]");
  }

  createUser = async (userDetails) => {
    await this.fName.waitFor();
    await this.fName.fill(userDetails.fname);
    await this.lName.waitFor();
    await this.lName.fill(userDetails.lname);

    await this.adressStreet.waitFor();
    await this.adressStreet.fill(userDetails.adressStreet);
    await this.adressPostal.waitFor();
    await this.adressPostal.fill(userDetails.adressPostal);
    await this.adressCity.waitFor();
    await this.adressCity.fill(userDetails.adressCity);

    await this.country.waitFor();
    await this.country.selectOption(userDetails.country);
  };
  saveDetails = async () => {
    const addressCountBefore = await this.saveBox.count();
    await this.saveForNextButton.waitFor();
    await this.saveForNextButton.click();

    await expect(this.saveBox).toHaveCount(addressCountBefore + 1);
    await this.savedFName.first().waitFor();
    expect(await this.savedFName.first().innerText()).toBe(
      await this.fName.inputValue()
    );
    await this.savedFName.first().waitFor();
    expect(await this.savedLName.first().innerText()).toBe(
      await this.lName.inputValue()
    );
    await this.savedFName.first().waitFor();
    expect(await this.savedStreet.first().innerText()).toBe(
      await this.adressStreet.inputValue()
    );
    await this.savedFName.first().waitFor();
    expect(await this.savedPostcode.first().innerText()).toBe(
      await this.adressPostal.inputValue()
    );
    await this.savedFName.first().waitFor();
    expect(await this.savedCity.first().innerText()).toBe(
      await this.adressCity.inputValue()
    );
    await this.savedFName.first().waitFor();
    expect(await this.savedCountry.first().innerText()).toBe(
      await this.country.inputValue()
    );
    //-- waitFor требует await, но не при использовании вызова через expect, а непосредственно перед объектом, к которому применяется waitFor
    //-- inputValue - проверка введенного текста, чтобы не использовать объект userDetails
  };
  continuePayment = async () => {
    await this.continuePaymentButton.waitFor();
    await this.continuePaymentButton.click();
    await this.page.waitForURL(/\/payment/, { timeout: 3000 });
  };
}
