import { CartPage } from "./CartPage";
import { LandingPage } from "./LandingPage";
import { ProductDescriptionPage } from "./ProductDescriptionPage";
import { ProfilePage } from "./ProfilePage";
import { SearchPage } from "./SearchPage";

class PageObjectManager {
    constructor(page) {
        this.landingPage = new LandingPage(page);
        this.profilePage = new ProfilePage(page);
        this.productPage = new ProductDescriptionPage(page);
        this.cartPage = new CartPage(page);
        this.searchPage = new SearchPage(page);
    }

    getLandingPage() {
        return this.landingPage;
    }
    getProfilePage() {
        return this.profilePage;
    }
    getProductDescriptionPage(){
        return this.productPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getSearchPage(){
        return this.searchPage;
    }
}
export { PageObjectManager };