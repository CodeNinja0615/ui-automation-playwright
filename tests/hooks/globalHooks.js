import { test } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  const status = testInfo.status;

  if (status === 'passed') {
    console.log(`✅ PASSED → ${testInfo.title}`);
    console.log(`${testInfo.titlePath}`);
  }

  if (status === 'failed') {
    console.log(`❌ FAILED → ${testInfo.title}`);
    console.log(`📍 File: ${testInfo.file}`);
  }
});
