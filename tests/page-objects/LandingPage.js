import { Page, Locator } from '@playwright/test';
import envJson from "../../test-data/url.json" with { type: "json" };
import Common from "./Common";
const timeout = envJson[0].timeout;

class LandingPage extends Common {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;
        this.headerText = (text) => page.locator(`//h1[contains(text(),'${text}')]`);
        this.homePage = () => page.locator(`//a[@id='uhfCatLogo' and @aria-label='Xbox']`);
    }
    async loginApplication(url, username, password) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle')
        await this.input('usernameEntry').waitFor({ state: 'visible', timeout: timeout.mid });
        await this.input('usernameEntry').fill(`${username}@outlook.com`);
        await this.clickAnElement(this.button('Next'));
        await this.headerText('Sign in another way').waitFor({ state: 'visible', timeout: timeout.mid });
        await this.clickAnElement(this.spanText('Use your password'));
        await this.input('passwordEntry').fill(password);
        await this.clickAnElement(this.button('Next'));
        await this.headerText('Stay signed in?').waitFor({ state: 'visible', timeout: timeout.mid });
        await this.clickAnElement(this.button('Yes'));

    }
}
export { LandingPage };