import { test, expect } from '@playwright/test';
import { BASE_URL } from '../playwright.config';
import { HOME_PAGE_SELECTOR, PEOPLE_PAGE_SELECTOR, PROJECTS_PAGE_SELECTOR } from './selectors';

const PEOPLE_LINK_SELECTOR = `${HOME_PAGE_SELECTOR} a[href$=people]`;
const PROJECTS_LINK_SELECTOR = `${HOME_PAGE_SELECTOR} a[href$=projects]`;

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('vue-skill-profile');
  });

  test('has 2 links', async ({ page }) => {
    await expect(page.locator(`${HOME_PAGE_SELECTOR} a`).count()).resolves.toEqual(2);
    await expect(page.locator(PEOPLE_LINK_SELECTOR)).toBeVisible();
  });

  test('can navigate to people', async ({ browser, page }) => {
    await page.click(PEOPLE_LINK_SELECTOR);
    await page.waitForSelector(PEOPLE_PAGE_SELECTOR);
    await expect(page.locator(PEOPLE_PAGE_SELECTOR)).toBeVisible();
  });

  test('can navigate to projects', async ({ browser, page }) => {
    await page.click(PROJECTS_LINK_SELECTOR);
    await page.waitForSelector(PROJECTS_PAGE_SELECTOR);
    await expect(page.locator(PROJECTS_PAGE_SELECTOR)).toBeVisible();
  });
});



