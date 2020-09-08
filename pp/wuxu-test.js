const PP = require('puppeteer-core');
const {
    PageLogin,
    PageDbList,
    PageDbDetailZhuce
} = require('./wuxu-class');

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
    pageDbDetailZhuce = new PageDbDetailZhuce({
        pageHandle: page,
        url: 'https://www.wuxuwang.com/yaopinzc/42682f29-a186-11ea-82b4-00163e0eafb3'
    });

    await pageDbDetailZhuce.init();

    console.log(pageDbDetailZhuce.basicInfo);
})();