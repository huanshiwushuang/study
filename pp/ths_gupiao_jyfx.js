const puppeteer = require('puppeteer-core');
var fs = require("fs");

var codeListPath = `./code/code.txt`;

async function run() {
    browser = await puppeteer.launch({
        headless: false,
        // args: [
        //     '--proxy-server=127.0.0.1:50488'
        // ],
        ignoreDefaultArgs: ['--enable-automation'],
        defaultViewport: {
            width: 1920,
            height: 1080
        },
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    });

    page = (await browser.pages())[0];
    await page.evaluateOnNewDocument(() => {
        delete navigator.__proto__.webdriver;
    });

    await page.setRequestInterception(true);
    page.on('request', async req => {
        if (req.url().indexOf('http://basic.10jqka.com.cn/') > -1 && req.url().indexOf('operate.html') > -1) {
            let code = req.url().replace('http://basic.10jqka.com.cn/', '').replace('/operate.html', '')
            await req.continue({
                headers: {
                    // 'Host': 'basic.10jqka.com.cn',
                    // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    // 'Accept-Encoding': 'gzip, deflate',
                    // 'Accept-Language': 'zh,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,nb;q=0.6,no;q=0.5',
                    // 'Cache-Control': 'max-age=0',
                    // 'Connection': 'keep-alive',
                    'Referer': `http://basic.10jqka.com.cn/${code}/`,
                    // 'Referer': `http://stockpage.10jqka.com.cn/`,
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4321.0 Safari/537.36 Edg/88.0.702.0'
                }
            })
        } else {
            await req.continue();
        }
    })

    let codeList = fs.readFileSync(codeListPath, 'utf8').replace(/\r/g, '').split('\n');
    console.log(codeList);
    // await page.waitFor(30000);
    for (let index = 0; index < codeList.length; index++) {
        const code = codeList[index];
        // if (await prisma.ssxx_main_introduction_info.findFirst({
        //     where: {
        //         company_name: code
        //     }
        // }) == null) {
        //     try {
        //         await processCode(code);
        //     } catch (error) {

        //     }
        await page.goto(`http://basic.10jqka.com.cn/${code}/operate.html`);
        await page.waitFor(5000);
        // } else {
        //     console.log(code, '已存在');
        // }
    }
}

run();
