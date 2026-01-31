import { test, expect } from "@playwright/test";
import envJson from "../../../test-data/url.json" with { type: "json" };
import { PageObjectManager } from "../../page-objects/PageObjectManager";
let poManager;
const envData = envJson[0];
const timeout = envJson[0].timeout;

test.describe.configure({ mode: 'serial' });
test.describe(`@Smoke `, async () => {
    test.beforeEach(`Navigate to ${envData} Web App`, async ({ page }) => {
        poManager = new PageObjectManager(page);
        await poManager.getLandingPage().loginApplication(envData.login_url, "Username", "password");
        await poManager.getLandingPage().homePage().waitFor({timeout: timeout.mid});
        expect(await poManager.getLandingPage().homePage().isVisible()).toBe(true);
    });
    test(``, async () => {

    });
});
