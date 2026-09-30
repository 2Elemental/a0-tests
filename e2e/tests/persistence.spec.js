const { test, expect } = require('@playwright/test');
// Saving, reloading and reopening traverse frontend -> backend -> isolated file-backed service.
test('persists and reopens a value', async ({ page, context }) => {
  await page.goto('/');
  await page.getByLabel('Name').fill('saved by real browser');
  await page.getByRole('button', {name:'Save'}).click();
  await expect(page.getByRole('status')).toHaveText('saved by real browser');
  await page.reload();
  await expect(page.getByRole('status')).toHaveText('saved by real browser');
  const reopened=await context.newPage();await reopened.goto('/');
  await expect(reopened.getByRole('status')).toHaveText('saved by real browser');
});
