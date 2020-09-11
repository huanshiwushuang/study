// https://github.com/berstend/puppeteer-extra/tree/0dddb2e927d0222a7b1b96b0c683897bfb743e76/packages/puppeteer-extra-plugin-repl
const PuppeteerExtra = require('puppeteer-extra');
const PuppeteerExtraPluginRepl = require('puppeteer-extra-plugin-repl');
const PuppeteerExtraPluginGhCustom = require('./puppeteer-extra-plugin-gh-custom');

PuppeteerExtra.use(PuppeteerExtraPluginRepl())
PuppeteerExtra.use(PuppeteerExtraPluginGhCustom())

PuppeteerExtra.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: null,
    // devtools: true,
    headless: false,
    args: [
        '--start-maximized'
    ]
}).then(async browser => {
    const page = await browser.newPage()
    await page.goto('https://www.baidu.com')

    // Start an interactive REPL here with the `page` instance.
    await page.repl()
    // Afterwards start REPL with the `browser` instance.
    await browser.repl()

    await browser.close()
})