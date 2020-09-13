const fs = require('fs');
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
//     blockedTypes: new Set(['image', 'media', 'font'])
// }))
PuppeteerExtra.use(PuppeteerExtraPluginGhCustom());

PuppeteerExtra.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    defaultViewport: null,
    // ignoreDefaultArgs: ['--enable-automation'],
    // slowMo: 200,
    devtools: true,
    args: [
        // '--remote-debugging-port=9222',
        // '-no-sandbox',
        '--start-maximized',
    ]
}).then(async browser => {
    let page = await browser.newPage();
    await page.goto('https://www.baidu.com/');
    // 点击-引导
    // await page.waitForSelector('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
    // await page.click('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
    // await page.waitForSelector('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
    // await page.click('body > div.guide.list > div.content.step3 > div > div.dib.right > div.btns > button')

    await page.click('#s-top-left > a:nth-child(5)');
    await page.goto('http://www.qq.com');
    return;


    // 读取 cookie
    var store = fs.readFileSync('./wuxu-store.json');
    store = JSON.parse(store.toString() || '{}');
    
    // 登录
    let pageLogin = new PageLogin({
        browser,
        data: {
            cookies: store.cookies
        }
    });
    await pageLogin.run();

    if (pageLogin.data.cookies) {
        // 写入 cookie
        fs.writeFileSync('./wuxu-store.json', JSON.stringify(Object.assign(store, {
            cookies: pageLogin.data.cookies
        })));
    }
    // 注册列表页
    exec({
        browser,
        pageHandle: pageLogin.pageHandle,
        url: 'http://www.wuxuwang.com/yaopinzc',
    })
    async function exec(...options) {
        let pageDbList = new PageDbList(...options);
        await pageDbList.run();
        for (let item of pageDbList.data.list) {
            let pageDbDetailZhuce = new PageDbDetailZhuce({
                browser,
                openerElHandle: item.detailElHandle,
            })
            await pageDbDetailZhuce.run();
            await pageDbDetailZhuce.pageHandle.close();
            
            item.detail = pageDbDetailZhuce.data;
        }

        fs.writeFileSync('123.json', JSON.stringify(pageDbList.data.list), {
            flag: 'a+'
        })

        console.log('写入完毕');

    }

    
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