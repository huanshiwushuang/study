const PP = require('puppeteer-core');
const fs = require('fs');
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
        // ignoreDefaultArgs: ['--enable-automation'],
        slowMo: 100,
        args: [
            // '--remote-debugging-port=9222',
            '--start-maximized',
            '-no-sandbox',
        ]
    });

    
    // 登录
    var pageLogin = new PageLogin({
        browser,
        url: 'https://wuxuwang.com/login'
    });
    await pageLogin.init();
    

    // 药品注册
    var pageDbList;
    // 药品注册详情
    var pageDbDetailZhuce;
    // 数据存储
    const datas = [];

    await exec({
        url: 'https://wuxuwang.com/yaopinzc?page=48',
        pageHandle: pageLogin.pageHandle,
    });
    async function exec({ url = '', nextElHandle, pageHandle }) {
        pageDbList = new PageDbList({
            url,
            nextElHandle,
            pageHandle,
            browser,
        })
        pageDbList.log(`开始 list url：${pageDbList.url}`);

        await pageDbList.init();
        // pageDbList.list = pageDbList.list.slice(-1);


        for (let item of pageDbList.list) {
            pageDbDetailZhuce = new PageDbDetailZhuce({
                elHandle: item.detailElHandle,
                browser,
            });
            pageDbDetailZhuce.log(`开始 detail url：${pageDbDetailZhuce.url}`);
            await pageDbDetailZhuce.init();
            Object.assign(item, {
                title: pageDbDetailZhuce.title,
                basicInfo: pageDbDetailZhuce.basicInfo,
            })
            pageDbDetailZhuce.log(`结束 detail url：${pageDbDetailZhuce.url}`);
        }
        pageDbList.log(`结束 list url：${pageDbList.url}`);

        datas.push(pageDbList.list);
        // 下一页
        if (pageDbList.nextElHandle) {
            exec({
                nextElHandle: pageDbList.nextElHandle,
                pageHandle,
                browser,
            });
        } else {
            pageDbList.log('没有更多了')
        }
    }
    // 药品注册详情

    fs.writeFileSync('123.json', JSON.stringify(datas), {
        flag: 'a'
    });


    
    
    // dbListArray.push()


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