import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../../page-objects/PageObjectManager";
import envJson from "../../../test-data/url.json" with { type: "json" };
import data_set from "../../../test-data/xboxTest101.json" with { type: "json" };
const username = data_set.username;
const envData = envJson[0];
const timeout = envJson[0].timeout;
let pom, landingPage;

test.describe.configure({ mode: 'serial' });
test.describe(`@Smoke Verify all header tabs are loading`, async () => {
    test.beforeEach(`Navigate to ${envData} Web App`, async ({ page }) => {
        pom = new PageObjectManager(page);
        landingPage = pom.getLandingPage();
        const password = landingPage.getCredentials(username);
        await landingPage.loginApplication(envData.login_url, username, password);
        await landingPage.homePage().waitFor({ timeout: timeout.mid });
        expect(await landingPage.homePage().isVisible()).toBe(true);
    });
    test(`Verify "Game Pass" Tab "Join Game Pass" is loading`, async () => {
        await landingPage.javaScriptClick(landingPage.headersDropdown('Game Pass', 'Join Game Pass'));
        await landingPage.headerText('XBOX GAME PASS').first().waitFor({timeout: timeout.mid});
        expect(await landingPage.headerText('XBOX GAME PASS').first().isVisible()).toBe(true);
    });
});
