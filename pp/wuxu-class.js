const moment = require('moment');

class PageUtil {
    constructor ({ url, pageHandle, browser } = {  }) {
        this.log('constructor start');

        this.url = url;
        this.pageHandle = pageHandle;
        this.browser = browser;
    }
    init () {
        this.log('init start');
    }
    async addJq () {
        this.log('addJq start');

        await this.pageHandle.addScriptTag({
            url: 'https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js'
        })
        await this.pageHandle.addScriptTag({
            content: 'var jq = jQuery.noConflict();'
        })
    }
    log (log) {
        console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')}-${this.constructor.name}-${log}`)
    }
}
class PageDbList extends PageUtil {
    constructor ({ url = '', pageHandle = null, browser }) {
        super({ url, pageHandle, browser });

        this.page = -1;
        this.list = [];
        this.nextElHandle = null;
    }
    async init () {
        super.init();

        if (this.nextElHandle) {
            await this.nextElHandle.click();
        } else if (this.url) {
            this.pageHandle = await this.browser.newPage();
            await this.pageHandle.goto(this.url);
            // 点击引导
            await page.click('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
            await page.click('body > div.guide.list > div.content.step3 > div > div.dib.right > div.btns > button')
        } else {
            return this.log('没有下一页了~');
        }
        // 等待表格渲染完成
        await this.pageHandle.waitForSelector('#app > div.main-content > div.layui-tab.layui-tab-brief.tabs > div > div > div > div.layui-table-box > div.layui-table-header');

        // 添加 jq
        await this.addJq();

        // 获取当前页码
        this.page = await this.pageHandle.evaluate(() => {
            return Promise.resolve(
                jq('.layui-laypage-curr').text().trim()
            )
        });
        // 获取当前 url
        this.url = await this.pageHandle.evaluate(() => {
            return Promise.resolve(
                location.href
            )
        });
        // 获取表格数据
        this.list = await this.getListArray();
        await this.initDetailElHandle();
        // 获取下一页的 句柄
        this.nextElHandle = await this.getNextElHandle();
        // 
    }
    // 每一条数据，找到详情页的 elHandle
    async initDetailElHandle () {
        for (let item of this.list) {
            item.detailElHandle = await this.pageHandle.$(`#app > div.main-content > div.layui-tab.layui-tab-brief.tabs > div > div > div > div.layui-table-box > div.layui-table-fixed.layui-table-fixed-l > div.layui-table-body > table [href="${item.detailHref}"]`);
        }
    }
    // 获取表格数据
    async getListArray () {
        return await this.pageHandle.evaluate(() => {
            var $headerTables = jq('.layui-table-header');
            var $bodyTables = jq('.layui-table-body');

            var fieldName = [...$headerTables.eq(0).find('th')].map(item => {
                return $(item).text().trim();
            });
            var $tds = $bodyTables.eq(0).find('td');
            var arr = [];
            // 转换 td 为二维数组
            for (let i = 0, j = Math.ceil($tds.length / fieldName.length); i < j; i++) {
                arr.push([...$tds.slice(fieldName.length * i, fieldName.length * i + fieldName.length)]);
            }
            // 获取 td 值
            return arr.reduce((sum, item) => {
                let obj = {};
                item.forEach((ite, inde) => {
                    // 第一个字段，有 url
                    if (inde === 0) {
                        obj.detailHref = $(ite).find('a').attr('href');
                    }
                    obj[ fieldName[inde] ] = $(ite).text().trim();
                })
                return sum.push(obj) && sum;
            }, []);
        })
    }
    // 获取下一页的 elHandle
    async getNextElHandle () {
        return await this.pageHandle.evaluateHandle((page) => {
            var next = jq('.layui-laypage-limits').prev();
            if (next.hasClass('layui-disabled')) {
                return;
            }
            return next.get(0);
        }, this.page);
    }
}
class PageDbDetailZhuce extends PageUtil {
    constructor ({ pageHandle = null, url = '', browser, elHandle }) {
        super({ pageHandle, url, browser })

        this.elHandle = elHandle;
        this.title = '';
        this.basicInfo = {};
    }
    async init () {
        super.init();
        await this.elHandle.click();
        this.pageHandle = await new Promise((resolve) => {
            this.browser.once('targetcreated', (target) => {
                resolve(target.page());
            })
        })
        await this.pageHandle.waitForSelector('header');
        await this.addJq();
        this.title = await this.pageHandle.evaluate(() => {
            return Promise.resolve(jq('h1').text().replace(/\s/g, ''));
        });
        this.basicInfo = await this.getTableObject();
        // 获取当前 url
        this.url = await this.pageHandle.evaluate(() => {
            return Promise.resolve(
                location.href
            )
        });

        await this.pageHandle.close();
    }
    async getTableObject () {
        return await this.pageHandle.evaluate(() => {
            var $tds = jq('table td');
            var arr = [];
            for (let i = 0, j = $tds.length / 2; i < j; i += 2) {
                arr.push([
                    $tds.eq(i).text().trim(),
                    $tds.eq(i+1).text().trim()
                ])
            }
            return arr;
        })
        
    }
}
class PageLogin extends PageUtil {
    constructor ({ pageHandle, url }) {
        super({ pageHandle, url })
    }
    async init () {
        await this.pageHandle.goto(this.url);
        await this.pageHandle.waitForSelector('#app > div.main-content.pr > div.center-box.pa > div.left.fl.h');
        await this.addJq();
        // 切换到输入账号密码
        await (
            await this.pageHandle.$('#app > div.main-content.pr > div.center-box.pa > div.right.fl.h.tc > button')
        ).click();
        await this.pageHandle.waitFor(1000);

        // 输入账号密码登录
        await this.pageHandle.type('#form-pwd > ul > li:nth-child(1) > div.input-box.phone > input[type=text]', '13709045820');
        await this.pageHandle.type('#form-pwd > ul > li:nth-child(2) > div > input[type=password]', '123123123');
        await Promise.all([
            this.pageHandle.click('#form-pwd > ul > li:nth-child(4) > div > button'),
            this.pageHandle.waitForSelector('header')
        ]);
        this.log('登录成功');
    }
}

module.exports = {
    PageLogin,
    PageDbList,
    PageDbDetailZhuce
}