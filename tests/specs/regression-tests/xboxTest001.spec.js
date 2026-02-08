import { test, expect } from '@playwright/test';
import { PageObjectManager } from "../../page-objects/PageObjectManager";
import envJson from "../../../test-data/url.json" with { type: "json" };
import data_set from "../../../test-data/xboxTest001.json" with { type: "json" };
import "../../hooks/globalHooks";
const username = data_set.username;
const envData = envJson[0];
const timeout = envJson[0].timeout;
/** @type {import('../../page-objects/LandingPage').LandingPage} */
let landingPage;
/** @type {import('../../page-objects/ProductDescriptionPage').ProductDescriptionPage} */
let productPage;
/** @type {import('../../page-objects/SearchPage').SearchPage} */
let searchPage;
/** @type {import('../../page-objects/CartPage').CartPage} */
let cartPage;
test.describe.configure({ mode: 'serial' });
test.describe(`@Regression ${data_set.testcase}`, async () => {
    /** @type {import('@playwright/test').Page} */
    let page;
    test.beforeAll(`Navigate to ${envData} Web App`, async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        const pom = new PageObjectManager(page);
        landingPage = pom.getLandingPage();
        productPage = pom.getProductDescriptionPage();
        searchPage = pom.getSearchPage();
        cartPage = pom.getCartPage();
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
        const titles = await landingPage.searchedTitles(data_set.titleToSearch).allTextContents();
        for (const title of titles) {
            expect(title).toContain(data_set.titleToSearch);
        }
    });
    test(`Verify "Product Pescription Page" is accessible for ${data_set.titleToSearch}`, async () => {
        await page.keyboard.press('Enter');
        await searchPage.openPDPforProduct(data_set.titleToSearch);
        await productPage.productName(data_set.titleToSearch).waitFor({ state: 'visible', timeout: timeout.mid });
        expect(await productPage.productName(data_set.titleToSearch).isVisible()).toBe(true);
    });
    test(`Verify ${data_set.titleToSearch} can be added to Cart`, async () => {
        await productPage.clickAnElement(productPage.addToCart(data_set.titleToSearch));
        try {
            await productPage.errorAddingToCart().waitFor({ timeout: timeout.mid });
            await productPage.clickAnElement(productPage.buttonTitle('Close'));
        } catch { }
        await expect(productPage.shoppingCartCount()).toHaveText('1');
    });
    test(`Naviagte to Cart Page and Verify ${data_set.titleToSearch} is displayed`, async () => {
        await productPage.clickAnElement(productPage.anchorTitle('Open cart'));
        await cartPage.anchorText(data_set.titleToSearch).waitFor({ timeout: timeout.max });
        await expect(cartPage.anchorText(data_set.titleToSearch)).toBeVisible();
    });
    test(`Verify all button are available`, async () => {
        await expect(cartPage.button('Remove')).toBeVisible();
        await expect(cartPage.button('Save for later')).toBeVisible();
        await expect(cartPage.button('Checkout')).toBeVisible();
        await expect(cartPage.spanText(data_set.price).first()).toBeVisible();
    });
});