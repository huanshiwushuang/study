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
            '-no-sandbox',
        ]
    });
    // class 定义-数据结构
    class dbList {
        constructor ({ page, url } = { page: -1, url: '', list: [] }) {
            this.page = page;
            this.url = url;
            this.list = list;
        }
        getList () {
            var $table = jq('table#db-list-table');
            var ths = $table.find('th');
            var tds = $table.find('td').slice(ths.length);
            
        }
    }

    class dbDetailZhuce {
        constructor ({
            title,
            yplx,
            sqlx,
            zcfl,
            pzwh,
            sbqy,
            cbrq,
        } = {
            title: '',
            yplx: '',
            sqlx: '',
            zcfl: '',
            pzwh: '',
            sbqy: '',
            cbrq: '',
        }) {
            this.title = title;
            this.yplx = yplx;
            this.sqlx = sqlx;
            this.zcfl = zcfl;
            this.pzwh = pzwh;
            this.sbqy = sbqy;
            this.cbrq = cbrq;
        }
    }
    // class 定义-中转逻辑
    var page = await browser.newPage();
    await page.goto('https://www.wuxuwang.com/yaopinzc');










    return;

    
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
        }
    })
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