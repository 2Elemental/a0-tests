const { test, expect } = require('@playwright/test');
// Network controls for a connected run: select with the filter 'network'.
test('network reaches the admitted host', async ({ page }) => {
  const response = await page.goto('https://example.com/');
  expect(response.status()).toBe(200);
});
test('network is refused another host', async ({ page }) => {
  await expect(page.goto('https://example.org/', { timeout: 15000 })).rejects.toThrow();
});
