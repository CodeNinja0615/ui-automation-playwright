import envJson from "../../test-data/url.json" with { type: "json" };
import Common from "../page-objects/Common";
const timeout = envJson[0].timeout;

class ProductDescriptionPage extends Common {
    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;
        this.productName = (text) => page.locator(`//h1[contains(text(), '${text}')]`);
    }

}
export {ProductDescriptionPage};