import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function axeScan(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  return results;
}

export async function checkAccessibility(page: Page, selector?: string) {
  let builder = new AxeBuilder({ page });

  if (selector) {
    builder = builder.include(selector);
  }

  const results = await builder
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  return {
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
  };
}
