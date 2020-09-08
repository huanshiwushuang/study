const pp = require('puppeteer-core');
const fs = require('fs');

(async () => {
    var browser = await pp.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        defaultViewport: null,
        ignoreDefaultArgs: ['--enable-automation'],
        // slowMo: 200,
        args: [
            // '--remote-debugging-port=9222',
            // '--start-fullscreen',
        ]
    });
    // 页面管理
    const pageSet = new Set();

    
    // 页面创建
    browser.on('targetcreated', async target => {
        console.log('targetcreated');
        var page = await target.page();
        if (page && !pageSet.has(page)) {
            // 添加 page
            pageSet.add(page);
            // 删除 webdriver
            page.evaluateOnNewDocument(async () => {
                delete navigator.__proto__.webdriver;
            })
            // 启用拦截
            // page.setRequestInterception(true);
            // page.on('request', async req => {
            //     req.continue();
            // })
            // page.on('response', async res => {
            //     var headers = await res.headers();
            //     // 如果是网页
            //     if (/html/.test(headers['content-type'])) {
            //         if (res.status().toString().startsWith('2')) {
            //             var text = await res.text();
            //             console.log(await res.url());
            //             if (text) {
            //                 fs.writeFileSync('123.html', text, {
            //                     flag: 'a'
            //                 });
            //             }
            //         }
            //     }
            // })
        }
    })
    // browser.on('targetchanged', async target => {
    //     console.log('targetchanged');
    //     var page = await target.page();
    //     if (page && pageSet.has(page)) {
            
    //     }
    // })
    browser.on('targetdestroyed', async target => {
        console.log('targetdestroyed');
        var page = await target.page();
        if (page && pageSet.has(page)) {
            // 删除 page
            pageSet.delete(page);
        }
    })

    const func = {
        getPageData () {
            return new Promise(resolve => {
                var data = {
                    page: jq('.layui-laypage-curr').text().trim(),
                    arr: [],
                };
                var table = jq('table#db-list-table');
                var ths = table.find('th');
                var trs = table.find('tr').slice(1);
                trs.each((index, item) => {
                    var obj = {};
                    $(item).find('td').each((inde, ite) => {
                        var $td = $(ite);
                        if (inde === 0) {
                            obj.detailUrl = $td.find('a').prop('href');
                        }
                        obj[$(ths[ $td.index() ]).text()] = $td.text().trim();
                    })
                    data.arr.push(obj);
                })
                resolve(data);
            })
        },
        async addJq () {
            await page.waitForNavigation();
            await page.addScriptTag({
                url: 'https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js'
            })
            await page.addScriptTag({
                content: 'var jq = jQuery.noConflict();'
            })
        }
    }

    var page = await browser.newPage();
    await page.goto('https://www.wuxuwang.com/yaopinzc');
    await func.addJq();
    await page.waitForSelector('.layui-table-body');

    var data = await page.evaluate(func.getPageData);
    fs.writeFileSync('123.json', JSON.stringify(data), {
        flag: 'a'
    })

    


    
})()