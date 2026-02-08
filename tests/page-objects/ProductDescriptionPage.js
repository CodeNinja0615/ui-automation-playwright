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
        this.addToCart = (text) => page.locator(`//button[@title="Add ${text} to cart"]`);
        this.cartAnchor = () => page.locator(`//a[@id='uhf-shopping-cart']`);
        this.shoppingCartCount = () => this.cartAnchor().locator(`//span[@class='shopping-cart-amount']`);
        this.errorAddingToCart = () => page.locator(`//h6[text()='You have reached the maximum quantity for a product.']`);
    }

}
export { ProductDescriptionPage };