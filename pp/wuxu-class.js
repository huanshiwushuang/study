const moment = require('moment');

class PageUtil {
    constructor ({ pageHandle, url }) {
        this.pageHandle = pageHandle;
        this.url = url;
        this.log('准备执行-构造函数');
    }
    async addJq () {
        this.log('准备执行-addJq');
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
    constructor ({ pageHandle, url }) {
        super({ pageHandle, url });

        this.pageHandle = pageHandle;
        this.page = -1;
        this.list = [];
        this.nextUrl = '';
    }
    async init () {
        await this.pageHandle.goto(this.url);
        await this.pageHandle.waitForSelector('header');
        await this.addJq();
        this.page = await this.pageHandle.evaluate(() => {
            return Promise.resolve(
                jq('.layui-laypage-curr').text().trim()
            )
        });
        this.url = await this.pageHandle.evaluate(() => {
            return Promise.resolve(
                location.href
            )
        });
        this.nextUrl = await this.getNextUrl();
        this.list = await this.getListArray();
    }
    // 获取表格数据
    async getListArray () {
        return await this.pageHandle.evaluate(() => {
            var $table = jq('table#db-list-table');
            var fieldName = [...$table.find('th')].map(item => {
                return $(item).text().trim();
            });
            var $tds = $table.find('td');
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
                        obj.detailUrl = $(ite).find('a').prop('href');
                    }
                    obj[ fieldName[inde] ] = $(ite).text().trim();
                })
                return sum.push(obj) && sum;
            }, []);
        })
    }
    async getNextUrl () {
        return await this.pageHandle.evaluate((page) => {
            var next = jq('.layui-laypage-limits').prev();
            if (next.hasClass('layui-disabled') || page == 10) {
                return;
            }
            return next.prop('href');
        }, this.page);
    }
}
class PageDbDetailZhuce extends PageUtil {
    constructor ({ pageHandle, url }) {
        super({ pageHandle, url })

        this.title = '';
        this.basicInfo = {};
    }
    async init () {
        await this.pageHandle.goto(this.url);
        await this.pageHandle.waitForSelector('header');
        await this.addJq();
        this.title = await this.pageHandle.evaluate(() => {
            return Promise.resolve(jq('h1').text().replace(/\s/g, ''));
        });
        this.basicInfo = await this.getTableObject();
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