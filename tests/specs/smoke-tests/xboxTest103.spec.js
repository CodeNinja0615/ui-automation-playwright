import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../../page-objects/PageObjectManager";
import { LandingPage } from "../../page-objects/LandingPage";
import { CartPage } from "../../page-objects/CartPage";
import envJson from "../../../test-data/url.json" with { type: "json" };
import data_set from "../../../test-data/xboxTest102_103.json" with { type: "json" };
import "../../hooks/globalHooks";
const username = data_set[1].username;
const envData = envJson[0];
const timeout = envJson[0].timeout;
/** @type {LandingPage} */
let landingPage;
/** @type {CartPage} */
let cartPage;

test.describe.configure({ mode: 'serial' });
test.describe(`@Smoke ${data_set[1].testcase}`, async () => {
    test.beforeAll(`Navigate to ${envData} Web App`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const pom = new PageObjectManager(page);
        landingPage = pom.getLandingPage();
        cartPage = pom.getCartPage();
        const password = landingPage.getCredentials(username);
        await landingPage.loginApplication(envData.login_url, username, password);
        await landingPage.homePage().waitFor({ state: 'visible', timeout: timeout.mid });
        expect(await landingPage.homePage().isVisible()).toBe(true);
    });
    test(`Navigate to "Cart Page"`, async () => {
        await cartPage.gotoCartPage('Garou8784');
        expect(await cartPage.cartHeader('Cart').isVisible()).toBe(true);
    });
});