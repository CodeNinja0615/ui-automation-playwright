
import envJson from "../../test-data/url.json" with { type: "json" };
import Common from "./Common";
const timeout = envJson[0].timeout;

class SearchPage extends Common{
    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page){
        super(page);
        this.page = page;
        this.productCard = () => page.locator(`//div[contains(@class, 'ProductCard-module__cardWrapper')]`);
        this.productTitle = (text) => this.productCard().locator(`//span[contains(@class,'ProductCard-module__title') and text()='${text}']`);
    }
    /**
     * 
     * @param {string} productName 
     */
    async openPDPforProduct(productName){
        await this.productTitle(productName).waitFor({state: 'visible', timeout: timeout.mid});
        await this.clickAnElement(this.productTitle(productName));
    }

}
export {SearchPage}