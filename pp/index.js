const pp = require('puppeteer-core');

(async () => {
    var browser = await pp.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        defaultViewport: null,
        ignoreDefaultArgs: ['--enable-automation'],
        // slowMo: 200,
        args: [
            // '--remote-debugging-port=9222',
            '--start-fullscreen',
        ]
    });

    var page = await browser.newPage();
    await page.goto('http://baidu.com/');

    await page.click('#u1 > a');

    await page.waitForSelector('#TANGRAM__PSP_11__footerULoginBtn');

    await page.click('#TANGRAM__PSP_11__footerULoginBtn');


    var user = await page.$('#TANGRAM__PSP_11__userName');
    var pwd = await page.$('#TANGRAM__PSP_11__password');

    // await user.type('');
    await user.focus();
    await page.keyboard.sendCharacter('1403902918@qq.com')
    // await pwd.type('guohao51390219');


    // await Promise.all([page.waitForNavigation(), page.click('#TANGRAM__PSP_11__submit')]);

    console.log('登陆成功');


    // await page.screenshot({
    //     path: '123asdzxc.png',
    //     fullPage: true
    // });


    // browser.close();

    
})()