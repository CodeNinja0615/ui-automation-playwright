import {Page, Locator} from '@playwright/test';
export default class Common{
    /**
     * 
     * @param {Page} page 
     */
    constructor(page){
        this.page = page
        this.input = (text) => page.locator(`//input[@id='${text}']`)
        this.spanText = (text) => page.locator(`//span[text()='${text}']`)
        this.button = (text) => page.locator(`//button[text()='${text}']`);
    }
    /**
     * 
     * @param {Locator} element 
     */
    async clickAnElement(element){
        await element.isVisible();
        await element.waitFor({state: 'attached'});
        await element.click();
    }

    async javaScriptClick(element){

    }
}