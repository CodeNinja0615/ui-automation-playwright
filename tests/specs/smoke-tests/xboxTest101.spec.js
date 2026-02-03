import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../../page-objects/PageObjectManager";
import { LandingPage } from "../../page-objects/LandingPage";
import envJson from "../../../test-data/url.json" with { type: "json" };
import data_set from "../../../test-data/xboxTest101.json" with { type: "json" };
import "../../hooks/globalHooks";
const username = data_set.username;
const envData = envJson[0];
const timeout = envJson[0].timeout;
/** @type {LandingPage} */
let landingPage;

test.describe.configure({ mode: 'serial' });
test.describe(`@Smoke ${data_set.testcase}`, async () => {
    test.beforeAll(`Navigate to ${envData} Web App`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const pom = new PageObjectManager(page);
        landingPage = pom.getLandingPage();
        const password = landingPage.getCredentials(username);
        await landingPage.loginApplication(envData.login_url, username, password);
        await landingPage.homePage().waitFor({state: 'visible', timeout: timeout.mid });
        expect(await landingPage.homePage().isVisible()).toBe(true);
    });
    for (let index in data_set.gamePassHeaders) {
        test(`Verify "Game Pass" Tab ${data_set.gamePassHeaders[index]} is loading`, async () => {
            await landingPage.javaScriptClick(landingPage.headersDropdown('Game Pass', data_set.gamePassHeaders[index]));
            await landingPage.headerText(data_set.gamePassTabScreenHeaders[index]).first().waitFor({ timeout: timeout.mid });
            expect(await landingPage.headerText(data_set.gamePassTabScreenHeaders[index]).first().isVisible()).toBe(true);
        });
    }
});
