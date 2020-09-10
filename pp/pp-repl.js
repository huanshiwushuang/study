// https://github.com/berstend/puppeteer-extra/tree/0dddb2e927d0222a7b1b96b0c683897bfb743e76/packages/puppeteer-extra-plugin-repl
const pp = require('puppeteer-extra');
const ppPluginRepl = require('puppeteer-extra-plugin-repl');

pp.use(ppPluginRepl())

pp.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: null,
    devtools: true,
    headless: true,
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