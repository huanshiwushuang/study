const PuppeteerExtra = require('puppeteer-extra');
const PuppeteerExtraPluginGhCustom = require('./puppeteer-extra-plugin-gh-custom');

PuppeteerExtra.use(PuppeteerExtraPluginGhCustom())

PuppeteerExtra.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: null,
    devtools: true,
    headless: false,
    args: [
        '--start-maximized',
        '--remote-debugging-port=9222'
    ]
}).then(async browser => {
    const page = await browser.newPage()
    await page.goto('https://www.wuxuwang.com')


    process.on('SIGINT', function () {
        browser.disconnect();
        process.exit();
    });
})

