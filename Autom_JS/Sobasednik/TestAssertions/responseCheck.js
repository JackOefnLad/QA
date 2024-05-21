const response = await this.page.waitForResponse((res) =>
  res.url().includes("/Fsubscribe")
);
expect(response.status()).toBe(200);
