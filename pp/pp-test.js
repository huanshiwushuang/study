const PP = require('./gh-puppeteer-core');

(async () => {
    const browser = await PP.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        defaultViewport: null,
        // ignoreDefaultArgs: ['--enable-automation'],
        slowMo: 100,
        args: [
            // '--remote-debugging-port=9222',
            '--start-maximized',
            '-no-sandbox',
        ]
    })

    browser.evaluateOnNewDocument(() => {
        delete Object.getPrototypeOf(navigator).webdriver;
    });
    browser.addScriptTag({
        content: `
            var _$ = $;
        `
    })
    browser.addScriptTag({
        url: 'https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js'
    })
    browser.addScriptTag({
        content: `
            var jq = jQuery.noConflict();;
            $ = _$;
        `
    })
    browser.setBypassCSP(true);
    browser.setRequestInterception(true);
    browser.setDefaultRequestInterception(true);

    var page = await browser.newPage();

    await page.goto('https://www.wuxuwang.com');
})()

