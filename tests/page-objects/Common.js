import { Page, Locator } from '@playwright/test';
import envJson from "../../test-data/url.json" with { type: "json" };
import login_creds from "../../test-data/login_user_data.json"
const timeout = envJson[0].timeout;
export default class Common {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        this.page = page
        this.input = (text) => page.locator(`//input[@id='${text}']`);
        this.spanText = (text) => page.locator(`//span[text()='${text}']`);
        this.headerText = (text) => page.locator(`//h1[contains(text(),'${text}')]`);
        this.searchedTitles = (text) => page.locator(`//b[contains(text(), '${text}')]`);
        this.button = (text) => page.locator(`//button[text()='${text}']`);
        this.profileName = (text) => page.locator(`(//div[text()='${text}'])[1]`);
        this.spinner = () => page.locator(`//div[@class='XboxSpinner-module__spinnerContainer___tyosA']`);
        this.headersDropdown = (text1, text2) => page.locator(`//button[contains(text(), '${text1}')]/following-sibling::ul/li/a[contains(text(), '${text2}')]`);
    }
    /**
     * 
     * @param {Locator} locator 
     */
    async clickAnElement(locator) {
        await locator.waitFor({state: 'visible', timeout: timeout.mid});
        await locator.waitFor({ state: 'attached', timeout: timeout.mid });
        await locator.click();
    }
    /**
     * 
     * @param {Locator} locator 
     */
    async javaScriptClick(locator) {
        await locator.evaluate(el => {
            el.waitFor({state: 'visible', timeout: timeout.mid});
            el.click();
        });
    }
    /**
     * 
     * @param {string} username 
     * @returns {string}
     */
    getCredentials(username) {
        for (const cred of Object.values(login_creds)) {
            if (cred.username === username) {
                return cred.password;
            }
        }
        return 'NO PASSWORD FOR GIVEN USERNAME';
    }
}