// const PuppeteerExtra = require('puppeteer-extra');
// const PuppeteerExtraPluginGhCustom = require('./puppeteer-extra-plugin-gh-custom');

const moment = require('moment');

class PageCommon {
    constructor ({ data = {}, browser, pageHandle = null, url = '' }) {
        if (typeof this.run !== 'function') {
            throw new Error('run method must defined');
        } else if (typeof this.create !== 'function') {
            throw new Error('create method must defined');
        } else if (typeof this.action !== 'function') {
            throw new Error('action method must defined');
        }
        this.browser = browser;
        this.pageHandle = pageHandle;
        this.url = url;
        this.data = data;
        this.relUrl = '';
    }

    async beforeRun() {
        this.log('beforeRun');
    }
    async run(func) {
        await this.beforeRun();
        await func.bind(this)();
        await this.afterRun();
    }
    async afterRun() {
        this.log('afterRun');
    }

    async beforeCreate () {
        this.log('beforeCreate');
    }
    async create(func) {
        await this.beforeCreate();
        await func.bind(this)();
        await this.afterCreate();
    }
    async afterCreate () {
        this.log('afterCreate');

        // 获取当前 url
        this.relUrl = await this.pageHandle.evaluate(() => {
            return location.href
        });
        // 注入 require
        // await this.pageHandle.addScriptTag({
        //     url: 'https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.min.js'
        // });
        // 注入 jquery
        let hasJq = await this.pageHandle.evaluate(() => {
            if (window.jQuery) {
                window.jq = jQuery
                return true;
            }
        });
        if (!hasJq) {
            await this.pageHandle.addScriptTag({
                url: 'https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js'
            })
        }
    }

    async beforeAction() {
        this.log('beforeAction');
    }
    async action(func) {
        await this.beforeAction();
        await func.bind(this)()
        await this.afterAction();
    }
    async afterAction() {
        this.log('afterAction');
    }
    // ---end---在 page 中待执行的方法
    log (log) {
        console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')}-${this.constructor.name}-${log.toString()}-${this.relUrl}`)
    }
}
class PageLogin extends PageCommon {
    constructor ({ browser, pageHandle = null, data }) {
        super({
            data,
            browser,
            pageHandle,
            url: 'https://www.wuxuwang.com/login',
        })
    }
    async run () {
        await super.run(async () => {
            await this.create();
            await this.action();
        })
    }
    async create() {
        await super.create(async () => {
            this.pageHandle = this.pageHandle || (await this.browser.newPage());

            await this.pageHandle.goto(this.url);
            // 等待切换账号的按钮
            await this.pageHandle.waitForSelector('#app > div.main-content.pr > div.center-box.pa > div.right.fl.h.tc > button');
        })
    }
    async action() {
        await super.action(async () => {
            // 尝试一次 cookie 登录
            if (this.data.cookies) {
                await this.pageHandle.setCookie(...this.data.cookies);
                let isSuccess = await this.isLoginSuccess();
                if (isSuccess) {
                    return this.log('cookie 登陆成功');
                } else {
                    this.log('cookie 登陆失败');
                }
            }

            // 尝试密码登陆次数 3
            let tryCount = 0;

            while (tryCount < 3) {
                await this.create();
                await this.passwdLogin();
                await this.pageHandle.waitForNavigation();
                let isSuccess = await this.isLoginSuccess();
                if (isSuccess) {
                    // 附加 cookie
                    this.data.cookies = await this.pageHandle.cookies();
                    this.log('密码登录成功');
                    break;
                } else {
                    this.log(`密码登陆失败，第 ${tryCount+1} 次`);
                }
                tryCount++;
            }
        })
    }
    async passwdLogin() {
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
        await this.pageHandle.goto('https://www.wuxuwang.com');
        await this.pageHandle.waitForSelector('header');
        let elHandle = await this.pageHandle.$('#app > header > div.fr > div.outer-ne > div > div.vip-icon');

        return !!elHandle;
    }
}
class PageDbList extends PageCommon {
    constructor ({ browser, pageHandle = null, url, nextElHandle }) {
        super({
            data: {
                list: [],
                detailElHandle: null,
                nextElHandle: null,
            },
            browser,
            pageHandle,
            url,
        });
        this.nextElHandle = nextElHandle;
    }
    async run() {
        await super.run(async () => {
            await this.create();
            await this.action();
        })
    }
    async create() {
        await super.create(async () => {
            // 继续下一页
            if (this.nextElHandle) {
                await Promise.all([
                    this.nextElHandle.click(),
                    this.pageHandle.waitForNavigation(),
                ])
            }
            // 第一次打开
            else {
                this.pageHandle = this.pageHandle || (await this.browser.newPage());
                await this.pageHandle.goto(this.url);
            }
            await this.pageHandle.$('#app > div.main-content > div.layui-tab.layui-tab-brief.tabs > div > div > div > div.layui-table-box > div.layui-table-header')
        })
    }
    async action() {
        await super.action(async () => {
            // 点击-引导
            try {
                await this.pageHandle.waitForSelector('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button', {
                    timeout: 2000
                })
                await this.pageHandle.click('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
                await this.pageHandle.waitForSelector('body > div.guide.list > div.content.step2 > div > div.dib.right > div.btns > button')
                await this.pageHandle.click('body > div.guide.list > div.content.step3 > div > div.dib.right > div.btns > button')
            } catch (e) {
                console.log(e);
            }
            // 获取-表格数据
            await this.getListArray();
            // 获取-详情页 elHandle
            await this.getDetailElHandle();
            // 获取-下一页 elHandle
            await this.getNextElHandle();
        })
    }
    // 获取-表格数据
    async getListArray () {
        this.data.list = await this.pageHandle.evaluate(() => {
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
    // 获取-详情页的 elHandle
    async getDetailElHandle () {
        for (let item of this.data.list) {
            item.detailElHandleSelector = `#app > div.main-content > div.layui-tab.layui-tab-brief.tabs > div > div > div > div.layui-table-box > div.layui-table-fixed.layui-table-fixed-l > div.layui-table-body > table [href="${item.detailHref}"]`;
        }
    }
    // 获取-下一页的 elHandle
    async getNextElHandle () {
        this.nextElHandle = await this.pageHandle.evaluateHandle(() => {
            var next = jq('.layui-laypage-limits').prev();
            if (next.hasClass('layui-disabled') || $('.layui-laypage-curr').text() >= 10) {
                return;
            }
            return next.get(0);
        });
    }
}
class PageDbDetailZhuce extends PageCommon {
    constructor ({ browser, openerElSelector, openerPageHandle }) {
        super({
            data: {
                title: '',
                basicInfo: {},
            },
            browser
        })
        this.openerElSelector = openerElSelector;
        this.openerPageHandle = openerPageHandle;
    }
    async run() {
        await super.run(async () => {
            await this.create();
            await this.action();
        })
    }
    async create() {
        await super.create(async () => {
            // 点击打开窗口
            await this.openerPageHandle.click(this.openerElSelector);
            // 获取 page
            this.pageHandle = await new Promise((resolve) => {
                this.browser.once('targetcreated', (target) => {
                    resolve(target.page());
                })
            })
            // 等待页面加载完成
            await this.pageHandle.waitForSelector('header');
        })
    }
    async action() {
        await super.action(async () => {
            // 获取数据
            this.data.title = await this.pageHandle.evaluate(() => {
                return jq('h1').text().replace(/\s/g, '')
            });
            await this.getTableObject();
        })
    }
    async getTableObject () {
        this.data.basicInfo = await this.pageHandle.evaluate(() => {
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
    PageCommon,
    PageLogin,
    PageDbList,
    PageDbDetailZhuce
}