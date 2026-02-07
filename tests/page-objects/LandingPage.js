import envJson from "../../test-data/url.json" with { type: "json" };
import Common from "./Common";
const timeout = envJson[0].timeout;

class LandingPage extends Common {
    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;
        this.homePage = () => page.locator(`//a[@id='uhfCatLogo' and @aria-label='Xbox']`);
    }
    /**
     * Sign In to Xbox.com with username and password
     * @param {string} url 
     * @param {string} username 
     * @param {string} password 
     */
    async loginApplication(url, username, password) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
        await this.input('usernameEntry').waitFor({ state: 'visible', timeout: timeout.mid });
        await this.input('usernameEntry').fill(`${username}@outlook.com`);
        await this.clickAnElement(this.button('Next'));
        await this.spanText('Other ways to sign in').waitFor({ state: 'visible', timeout: timeout.mid });
        await this.clickAnElement(this.spanText('Other ways to sign in'));
        await this.headerText('Sign in another way').waitFor({ state: 'visible', timeout: timeout.mid });
        await this.clickAnElement(this.spanText('Use your password'));
        await this.input('passwordEntry').fill(password);
        await this.clickAnElement(this.button('Next'));
        await this.headerText('Stay signed in?').waitFor({ state: 'visible', timeout: timeout.mid });
        await this.clickAnElement(this.button('Yes'));
    }
    /**
     * To search title from home
     * @param {string} titleName 
     */
    async searchTitleFromHome(titleName) {
        await this.profileName('Garou8784').waitFor({ state: 'visible', timeout: timeout.max });
        await this.clickAnElement(this.spanText('Search'));
        await this.input('cli_shellHeaderSearchInput').pressSequentially(titleName);
        await this.searchedTitles(titleName).nth(0).waitFor({ state: 'visible', timeout: timeout.max });
    }
}
export { LandingPage };