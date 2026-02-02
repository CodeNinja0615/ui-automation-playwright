import { Page, Locator } from '@playwright/test';
import envJson from "../../test-data/url.json" with { type: "json" };
import Common from "./Common";
const timeout = envJson[0].timeout;

class CartPage extends Common {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;
        this.cartFrame = () => page.frameLocator(`//iframe[@name='store-cart-frame_Light_false']`);
        this.cartHeader = (text) => this.cartFrame().locator(`//h1[contains(text(),'${text}')]`);

    }
    /**
     * Navigate to Cart Page
     *  @param {string} profileName 
     */
    async gotoCartPage(profileName) {
        await this.profileName(profileName).waitFor({ state: 'visible', timeout: timeout.max });
        await this.clickAnElement(this.spanText('Cart'));
        await this.cartHeader('Cart').waitFor({ state: 'visible', timeout: timeout.mid });
    }
}
export { CartPage };