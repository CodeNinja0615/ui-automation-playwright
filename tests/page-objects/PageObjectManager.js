import { LandingPage } from "./LandingPage";

class PageObjectManager {
    constructor(page) {
       this.landingPage = new LandingPage(page);
    }

    getLandingPage(){
        return this.landingPage;
    }
}
export {PageObjectManager};