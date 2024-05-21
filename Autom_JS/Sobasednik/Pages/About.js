import { expect } from "@playwright/test";
import { getRandomElement } from "../Functions/randSex.js";

export class About {
  constructor(page) {
    this.page = page;
    this.details = page.getByText("Форма бронирования питомца");
    this.name = page.getByPlaceholder("Имя");
    this.lName = page.getByPlaceholder("Фамилия");
    this.email = page.getByPlaceholder("name@example.com");
    this.secondSections = page.getByText("Когда хотите забрать?");
    this.sex = page.locator("#sex-1");
    this.sex2 = page.locator("#sex-radio-2");
    this.sex3 = page.locator("#sex-radio-3");

    this.phone = page.getByPlaceholder("Mobile Number");
    this.date = page.locator("#date");
    this.tinyDog = page.getByText("Маленькая собачка");
    this.mediumDog = page.getByText("Собачка среднего размера");
    this.largeDog = page.getByText("Гигансткая собачища");

    this.langRU = page
      .locator("div")
      .filter({ hasText: /^Русский$/ })
      .locator("#hobbies-checkbox-1");
    this.langEN = page
      .locator("div")
      .filter({ hasText: /^Английский$/ })
      .locator("#hobbies-checkbox-2");
    this.langJava = page
      .locator("div")
      .filter({ hasText: /^Java$/ })
      .locator("#hobbies-checkbox-3");
    this.attachment = page.locator('[id="загрузите\\ картинку"]');
    this.textArea = page.getByPlaceholder("Прописка");
    this.confBtn = page.getByRole("button", { name: "ПОДТВЕРДИТЬ ОТПРАВКУ" });
  }
  fillForm = async () => {
    //const deltaX = 0;
    //const deltaY = 1000;
    const locator = this.details;
    await locator.scrollIntoViewIfNeeded(this.details);

    // await this.page.mouse.wheel(0, 800);
    await this.details.waitFor();
    await this.name.waitFor();
    await this.lName.waitFor();
    await this.email.waitFor();

    await this.name.fill("Иван");
    await this.lName.fill("Иванов");
    await this.email.fill("test@mail.com");
    // await this.page.mouse.wheel(0, 500);

    await this.secondSections.scrollIntoViewIfNeeded(this.secondSections);

    const randSex = [this.sex, this.sex2, this.sex3];
    const randomSex = getRandomElement(randSex);

    // console.log(randomSex);

    await this.sex.waitFor();
    await this.sex2.waitFor();
    await this.sex3.waitFor();
    await randomSex.click();

    await this.phone.waitFor();
    await this.phone.fill(`8999123412`);
    await this.date.waitFor;
    await this.date.fill("12 Jan 2025");

    await this.page.mouse.wheel(0, 500);

    await this.tinyDog.waitFor();
    // await this.tinyDog.click();
    await this.mediumDog.waitFor();
    await this.mediumDog.click();
    expect(this.mediumDog).toBeChecked();
    await this.largeDog.waitFor();
    await this.largeDog.click();
    expect(this.largeDog).toBeChecked();

    await this.langRU.waitFor();
    await this.langRU.check();
    await this.langEN.waitFor();
    await this.langEN.check();
    await this.langJava.waitFor();
    await this.langJava.check();

    const fileToAttach = this.page.waitForEvent("filechooser");
    await this.attachment.click();
    const fileChooser = await fileToAttach;
    await fileChooser.setFiles("pic.jpg");

    await this.textArea.waitFor();
    await this.textArea.fill("ASDASDASDASDasdasdADa");

    await this.confBtn.waitFor();
    await this.confBtn.click();

    await this.page.pause();
  };
}
