const { test, expect } = require('@playwright/test');
// A deliberate UI failure: the status never reads 'wrong', so this test fails and keeps a screenshot and a trace.
test('deliberate UI failure', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('status')).toHaveText('wrong', { timeout: 1000 });
});
