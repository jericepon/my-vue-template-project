import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://drag-and-drop-card-ui.netlify.app/');
  await page.getByRole('button', { name: 'Add item' }).click();
  await page.locator('.bg-card.text-card-foreground.flex.gap-6').click();
  await page.getByRole('textbox').nth(1).fill('Plant a tree');
  await page.getByRole('textbox').nth(1).press('Tab');
  await page.getByRole('textbox').nth(1).press('Escape');
});


test('duplicate item', async ({ page }) => {
  await page.goto('https://drag-and-drop-card-ui.netlify.app/');
  await page.getByRole('button', { name: 'Add item' }).click();
  await page.getByRole('button').nth(1).click();
});

test('delete item', async ({ page }) => {
  await page.goto('https://drag-and-drop-card-ui.netlify.app/');
  await page.getByRole('button', { name: 'Add item' }).click();
  await page.getByRole('button').nth(2).click();
});