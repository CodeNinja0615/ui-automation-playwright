import { Page, Locator } from '@playwright/test';
import envJson from "../../test-data/url.json" with { type: "json" };
import Common from "../page-objects/Common";
const timeout = envJson[0].timeout;

class ProductDescriptionPage extends Common {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;
    }
}
export {ProductDescriptionPage};