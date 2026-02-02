import { Page, Locator } from '@playwright/test';
import envJson from "../../test-data/url.json" with { type: "json" };
import Common from './Common';
import { text } from 'node:stream/consumers';
const timeout = envJson[0].timeout;


class ProfilePage extends Common {
    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;
        this.profileIcon = () => page.locator(`//div[@id='mectrl_headerPicture']`);
        this.xboxProfile = () => page.locator(`//a[text()='Xbox Profile']`);
        this.gamerTag = (text) => page.locator(`//div[contains(@class, 'ProfileHeader-module__gamertag')]/div[contains(@class, 'ProfileHeader-module__gamertag') and text()='${text}']`);
    }
    /**
     * Navigate to user profile
     * @param {string} profileName 
     */
    async navigateToProfile(profileName) {
        await this.profileName(profileName).waitFor({ state: 'visible', timeout: timeout.max });
        await this.javaScriptClick(this.profileIcon());
        await this.xboxProfile().waitFor({ state: 'visible', timeout: timeout.mid });
        await this.javaScriptClick(this.xboxProfile());
    }

}
export { ProfilePage };