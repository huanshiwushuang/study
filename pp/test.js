const fs = require('fs');
const PuppeteerExtra = require('puppeteer-extra');
const { proxyRequest } = require('puppeteer-proxy');
const PuppeteerExtraPluginGhCustom = require('./puppeteer-extra-plugin-gh-custom');

// nodejs 不拒绝未经验证的证书
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
        '--proxy-server=http://127.0.0.1:9000'
    ]
}).then(async browser => {

    // let page = await browser.newPage()

    // await page._client.send("Target.setAutoAttach", {
    //   autoAttach: true,
    //   flatten: true,
    //   windowOpen: true,
    //   waitForDebuggerOnStart: true // is set to false in pptr
    // })

    // page._client.on(
    //   "Target.attachedToTarget",
    //   async event => {
    //     console.log(event);
    //     if (event.waitingForDebugger) {
    //       console.log("continue")

    //       const newConn = await browser._connection.createSession(
    //         event.targetInfo
    //       )

    //       await newConn.send("Network.setExtraHTTPHeaders", {
    //         headers: { "x-foo": "hi-there" }
    //       })
    //       await newConn.send("Runtime.enable")
    //       await newConn.send("Page.setLifecycleEventsEnabled", {
    //         enabled: true
    //       })
    //       await newConn.send("Network.enable")
    //       await newConn.send("Page.enable")

    //       await newConn.send("Runtime.runIfWaitingForDebugger")
    //       console.log("all sent")
    //       await newConn.send("Page.reload") // Will not load without
    //     }
    //   }
    // )

    // await page.goto(
    //   "https://httpbin.org/headers" // HTML page that will open a popup
    // )


    // return;


    // browser.on('targetcreated', async (target) => {
    //     console.log('打开了');
        
    //     let cdp = await target.createCDPSession();

    //     await cdp.send('Target.setAutoAttach', {
    //         autoAttach: false,
    //         waitForDebuggerOnStart: true,
    //     })
    //     // setTimeout(async () => {
    //     //     console.log('哈哈')
    //     //     console.log(target)
    //     //     await cdp.send('Target.attachToTarget', {
    //     //         targetId: target.targetInfo.targetId
    //     //     })

    //     //     let info = await cdp.send('Target.getTargetInfo');
    //     //     if (info.targetInfo.type === 'page') {
    //     //         console.log(info);
    //     //         info.targetInfo.url = info.targetInfo.url + '?asd=123'
    //     //     }
    //     // }, 5000)
    //     // await cdp.send('Target.enable');
       
        
    //     // await cdp.send('Page.enable');

    //     // await cdp.on('Page.windowOpen', (e) => {
    //     //     console.log('Page.windowOpen');
    //     //     // console.log(e);
    //     //     e.url = e.url + '?asd=123'
    //     // })
    //     // await cdp.send('Runtime.enable');

    //     // await cdp.on('Runtime.executionContextCreated', (ctx) => {
    //     //     console.log('Runtime.executionContextCreated');
    //     //     console.log(ctx);
    //     // })
    //     // await cdp.on('Runtime.inspectRequested', (remoteObj) => {
    //     //     console.log('Runtime.inspectRequested');
    //     //     console.log(remoteObj);
    //     // })

    //     // await cdp.send('Network.enable');
    //     // await cdp.send('Network.setCacheDisabled', {
    //     //     cacheDisabled: false,
    //     // });

    //     // await cdp.send('Fetch.enable');
    //     // await cdp.on('Network.requestWillBeSent', async (e) => {
    //     //     console.log('Network.requestWillBeSent');
    //     //     if (!e.documentURL.startsWith('devtools')) {
    //     //         console.log(e.request.url);
    //     //     }


    //     //     // await cdp.send('Fetch.continueRequest')

    //     // })
    //     // await cdp.on('Network.responseReceived', (e) => {
    //     //     console.log('Network.responseReceived');
    //     //     if (e.response.protocol !== 'devtools') {
    //     //         console.log(e.response);
    //     //     }
    //     // })

    //     // if (target.type() === 'page') {
    //     //     let page = await target.page();
    //     //     await page.setRequestInterception(true);
    //     //     page.on('request', async request => {
    //     //         console.log(request.url()+'---'+request.resourceType());
                
    //     //         // var _respond = request.respond;
    //     //         // request.respond = function ({ status, headers, body }) {
    //     //         //     if (status === 200 && body && /text\/html/i.test(headers['content-type'])) {
    //     //         //         body = `
    //     //         //             <h1>123</h1>
    //     //         //             <script>
    //     //         //                 setTimeout(() => {
    //     //         //                     alert('hello world!');
    //     //         //                 }, 3000);
    //     //         //             </script>
    //     //         //             ${body.toString()}
    //     //         //         `
    //     //         //     }
    //     //         //     _respond.call(this, { status, headers, body });
    //     //         // }
    //     //         // await proxyRequest({
    //     //         //     page,
    //     //         //     proxyUrl: 'http://127.0.0.1:8888',
    //     //         //     request,
    //     //         // });

    //     //         request.continue();
    //     //     })
    //     // }
    // })
    var page = await browser.newPage();

    // let pages = await browser.pages()
    // // return console.log(pages);
    // let page = pages[0];
    // let cdp = await page.target().createCDPSession();
    // // console.log(browser.defaultBrowserContext());
    // // return;
    
    // await cdp.send('Target.createTarget', {
    //     url: 'chrome://downloads',
    //     // browserContextId: contextId || undefined,
    //     // enableBeginFrameControl: true,
    // });

    // await cdp.send('Target.setAutoAttach', {
    //     autoAttach: true,
    //     waitForDebuggerOnStart: true
    // })
    
    // // cdp.on('Target.targetCreated', e => {
    // //     console.log('Target.targetCreated');
    // //     console.log(e);
    // // })
    

    await page.goto('http://www.baidu.com/');
    // // await page.waitForSelector('#s-top-left > a:nth-child(5)');
    // // await page.click('#s-top-left > a:nth-child(5)');
    
    // let val = await page.evaluate(() => {
    //     return document.hidden;
    // })

    // console.log(val);

    
})