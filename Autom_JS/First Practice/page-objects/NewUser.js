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
    this.saveBox = page.locator("[data-qa=saved-address-container]");
    //this.saveAndContinue = page.locator("[data-qa=continue-to-payment-button]");
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

    // await this.saveForNextButton.waitFor().click();
    // await this.saveAndContinue.waitFor().click();
  };
  saveDetails = async () => {
    const addressCountBefore = await this.saveBox.count();
    await this.saveForNextButton.waitFor();
    await this.saveForNextButton.click();

    await expect(this.saveBox).toHaveCount(addressCountBefore + 1);
    //await this.page.pause();
  };
}
