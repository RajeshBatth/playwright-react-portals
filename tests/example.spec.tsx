import { test, expect } from '@playwright/experimental-ct-react';
import App from '../src/App';

test('normal mode', async ({ mount }) => {
  const component = await mount(<App />);
  await component.getByRole('button', { name: 'Add Todo Normal Mode' }).click();
  await expect(component.getByPlaceholder('Enter Todo')).toBeVisible()
  await component.getByPlaceholder('Enter Todo').fill("Learn Playwright")
  await component.getByRole('button', {name: 'submit'}).click()
  await expect(component.getByText("Learn Playwright")).toBeVisible()
});

test('portal mode', async ({ mount }) => {
  const component = await mount(<App />);
  await component.getByRole('button', { name: 'Add Todo via Portal' }).click();
  await expect(component.getByPlaceholder('Enter Todo')).toBeVisible()
  await component.getByPlaceholder('Enter Todo').fill("Learn Playwright")
  await component.getByRole('button', {name: 'submit'}).click()
  await expect(component.getByText("Learn Playwright")).toBeVisible()
});
