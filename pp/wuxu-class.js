// const PuppeteerExtra = require('puppeteer-extra');
// const PuppeteerExtraPluginGhCustom = require('./puppeteer-extra-plugin-gh-custom');

const moment = require('moment');


class PageCommon {
    constructor ({ browser = null, pageHandle = null, url = '', data = {} }) {
        this.browser = browser;
        this.pageHandle = pageHandle;
        this.url = url;
        this.data = data;
    }
    log (log) {
        console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')}-${this.constructor.name}-${log.toString()}`)
    }
}
class PageLogin extends PageCommon {
    constructor ({ browser, pageHandle = null }) {
        super({
            browser,
            pageHandle,
            url: 'https://www.wuxuwang.com/login',
        })
    }
    async create() {
        this.pageHandle = this.pageHandle || (await this.browser.newPage());

        await this.pageHandle.goto(this.url);
        // 等待切换账号的按钮
        await this.pageHandle.waitForSelector('#app > div.main-content.pr > div.center-box.pa > div.right.fl.h.tc > button');
    }
    async run () {
        // 尝试登陆次数 3
        let tryCount = 0;

        while (tryCount < 3) {
            await this.create();
            await this.startLogin();
            let isSuccess = await this.isLoginSuccess();
            if (isSuccess) {
                this.log('登陆成功');
                break;
            } else {
                this.log(`登陆失败，第 ${tryCount+1} 次`);
            }
            tryCount++;
        }
    }
    async startLogin() {
        // 切换到账号密码登陆
        await this.pageHandle.click('#app > div.main-content.pr > div.center-box.pa > div.right.fl.h.tc > button');
        // 等待切换效果完成
        await this.pageHandle.waitFor(1500);
        // 输入账号
        await this.pageHandle.type('#form-pwd > ul > li:nth-child(1) > div.input-box.phone > input[type=text]', '13709045820');
        // 输入密码
        await this.pageHandle.type('#form-pwd > ul > li:nth-child(2) > div > input[type=password]', '123123123');
        // 点击登陆
        await this.pageHandle.click('#form-pwd > ul > li:nth-child(4) > div > button')
    }
    async isLoginSuccess() {
        await this.pageHandle.waitForNavigation();
        await this.pageHandle.goto('https://www.wuxuwang.com');
        let elHandle = await this.pageHandle.$('#app > header > div.fr > div.outer-ne > div > div.vip-icon');

        return !!elHandle;
    }
}
class PageDbList extends PageCommon {
    constructor ({ url = '', nextElHandle = null, pageHandle = null, browser }) {
        super({ url, pageHandle, browser });

        this.page = -1;
        this.list = [];
        this.nextElHandle = nextElHandle;
    }
    async init () {
        super.init();

        if (this.nextElHandle) {
            await this.nextElHandle.click();
        } else if (this.url) {
            // 如果没有 pageHandle
            if (!this.pageHandle) {
                this.pageHandle = await this.browser.newPage();
            }
            await this.pageHandle.goto(this.url);
            // 点击引导
            await this.pageHandle.waitForSelector('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
            await this.pageHandle.click('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
            await this.pageHandle.waitForSelector('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
            await this.pageHandle.click('body > div.guide.list > div.content.step3 > div > div.dib.right > div.btns > button')
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
class PageDbDetailZhuce extends PageCommon {
    constructor ({ elHandle, browser }) {
        super({ browser })

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


module.exports = {
    PageLogin,
    PageDbList,
    PageDbDetailZhuce
}