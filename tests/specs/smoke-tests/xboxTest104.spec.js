import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../../page-objects/PageObjectManager";
import { LandingPage } from "../../page-objects/LandingPage";
import { ProductDescriptionPage } from "../../page-objects/ProductDescriptionPage";
import envJson from "../../../test-data/url.json" with { type: "json" };
import data_set from "../../../test-data/xboxTest104.json" with { type: "json" };
import "../../hooks/globalHooks";
const username = data_set.username;
const envData = envJson[0];
const timeout = envJson[0].timeout;
/** @type {LandingPage} */
let landingPage;
/** @type {ProductDescriptionPage} */
let productPage;

test.describe.configure({ mode: 'serial' });
test.describe(`@Smoke ${data_set.testcase}`, async () => {
    test.beforeAll(`Navigate to ${envData} Web App`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const pom = new PageObjectManager(page);
        landingPage = pom.getLandingPage();
        productPage = pom.getProductDescriptionPage();
        const password = landingPage.getCredentials(username);
        await landingPage.loginApplication(envData.login_url, username, password);
        await landingPage.homePage().waitFor({ state: 'visible', timeout: timeout.mid });
        expect(await landingPage.homePage().isVisible()).toBe(true);
    });
    test(`Search ${data_set.titleToSearch} in search bar`, async () => {
        await landingPage.searchTitleFromHome(data_set.titleToSearch);
        expect(await landingPage.searchedTitles(data_set.titleToSearch).first().isVisible()).toBe(true);
    });
    test(`Verify all search suggestions are for ${data_set.titleToSearch}`, async () => {
        let titles = await landingPage.searchedTitles(data_set.titleToSearch).allTextContents();
        for (let title of titles) {
            expect(title).toContain(data_set.titleToSearch);
        }
    });
    test(`Verify "Product Pescription Page" is accessible for ${data_set.titleToSearch}`, async () => {
        await landingPage.clickAnElement(landingPage.searchedTitles(data_set.titleToSearch).first());
        await productPage.productName(data_set.titleToSearch).waitFor({ state: 'visible', timeout: timeout.mid });
        expect(await productPage.productName(data_set.titleToSearch).isVisible()).toBe(true);
    });
});