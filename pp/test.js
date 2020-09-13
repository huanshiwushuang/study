const fs = require('fs');
const puppeteer = require('puppeteer-core');
const { proxyRequest } = require('puppeteer-proxy');

// nodejs 不拒绝未经验证的证书
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

puppeteer.launch({
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
    browser.on('targetcreated', async (target) => {
        console.log('打开了');
        if (target.type() === 'page') {
            let page = await target.page();
            await page.setRequestInterception(true);
            page.on('request', async request => {
                console.log(request.url()+'---'+request.resourceType());
                
                var _respond = request.respond;
                request.respond = function ({ status, headers, body }) {
                    if (status === 200 && body && /text\/html/i.test(headers['content-type'])) {
                        body = `
                            <h1>123</h1>
                            <script>
                                setTimeout(() => {
                                    alert('hello world!');
                                }, 3000);
                            </script>
                            ${body.toString()}
                        `
                    }
                    _respond.call(this, { status, headers, body });
                }
                await proxyRequest({
                    page,
                    proxyUrl: 'http://127.0.0.1:8888',
                    request,
                });
            })
        }
    })
    var page = await browser.newPage();
    // let cdp = await page.target().createCDPSession();
    // await cdp.send('Page.enable');

    // cdp.on('Page.windowOpen', (e) => {
    //     console.log('Page.windowOpen');
    //     console.log(e);
    // })
    // cdp.on('Target.targetCreated', e => {
    //     console.log('Target.targetCreated');
    //     console.log(e);
    // })
    

    await page.goto('http://www.baidu.com/');
    await page.waitForSelector('#s-top-left > a:nth-child(5)');
    await page.click('#s-top-left > a:nth-child(5)');
    

    
})