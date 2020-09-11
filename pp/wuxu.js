const PuppeteerExtra = require('puppeteer-extra');
// 插件-资源拦截
// https://www.npmjs.com/package/puppeteer-extra-plugin-block-resources
const PuppeteerExtraPluginBlockResources = require('puppeteer-extra-plugin-block-resources');
// 插件-自定义
const PuppeteerExtraPluginGhCustom = require('./puppeteer-extra-plugin-gh-custom');
const {
    PageLogin,
    PageDbList,
    PageDbDetailZhuce
} = require('./wuxu-class');

// PuppeteerExtra.use(PuppeteerExtraPluginBlockResources({
//     blockedTypes: new Set(['image', 'media', 'font', 'texttrack'])
// }))
PuppeteerExtra.use(PuppeteerExtraPluginGhCustom());

PuppeteerExtra.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    defaultViewport: null,
    // ignoreDefaultArgs: ['--enable-automation'],
    // slowMo: 200,
    args: [
        // '--remote-debugging-port=9222',
        // '-no-sandbox',
        '--start-maximized',
    ]
}).then(async browser => {
    // var page = await browser.newPage();
    let pageLogin = new PageLogin({
        browser
    });
    await pageLogin.run();
    
    console.log(pageLogin.data);

})

return;

(async () => {
    var browser = await PP.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        defaultViewport: null,
        ignoreDefaultArgs: ['--enable-automation'],
        // slowMo: 200,
        args: [
            // '--remote-debugging-port=9222',
            // '--start-fullscreen',
            '-no-sandbox',
        ]
    });

    
    // class 定义-中转逻辑
    var page = await browser.newPage();

    // 登录
    var pageLogin = new PageLogin({
        pageHandle: page,
        url: 'https://www.wuxuwang.com/login'
    });
    await pageLogin.init();

    // 
    // var page = await browser.newPage();
    await page.goto('https://www.wuxuwang.com/yaopinzc');
    await page.waitForSelector('#app > div.main-content > div.layui-tab.layui-tab-brief.tabs > div > div > div > div.layui-table-box > div.layui-table-header')
    await page.click('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
    await page.click('body > div.guide.list > div.content.step3 > div > div.dib.right > div.btns > button')


    var el = await page.$('#app > div.main-content > div.layui-tab.layui-tab-brief.tabs > div > div > div > div.layui-table-box > div.layui-table-fixed.layui-table-fixed-l > div.layui-table-body > table > tbody > tr:nth-child(10) > td:nth-child(1) > div > a');
    console.log(el);
    pageDbDetailZhuce = new PageDbDetailZhuce({
        browser,
        url: 'https://www.wuxuwang.com/yaopinzc',
        elHandle: el
    });
    // pageDbList = new PageDbList({
    //     browser,
    //     url: 'https://www.wuxuwang.com/yaopinzc'
    // });

    await pageDbDetailZhuce.init();

    console.log(pageDbDetailZhuce);
    
})();