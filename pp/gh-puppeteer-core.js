const PP = require('puppeteer-core');
const moment = require('moment');

class Util {
    log (log) {
        console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')}-${this.constructor.name}-${log.toString()}`)
    }
}
class Browser extends Util {
    #options;
    #browser;
    #evaluateOnNewDocument = [];
    #addScriptTag = [];
    // Boolean
    #setBypassCSP;
    // Boolean
    #setRequestInterception;
    // Boolean
    #setDefaultRequestInterception;


    constructor ({ browser, options }) {
        super();

        this.#browser = browser;
        this.#options = options;
        // 暴露原生 browser 对象
        this.src = browser;
    }
    async newPage () {
        let page = await this.#browser.newPage();

        // 为每个 page 注入 evaluateOnNewDocument
        if (this.#evaluateOnNewDocument.length) {
            for (let args of this.#evaluateOnNewDocument) {
                await page.evaluateOnNewDocument(...args);
            }
        }
        // 为每个 page 设置 CSP
        if (this.#setBypassCSP) {
            page.setBypassCSP(...this.#setBypassCSP);
        }
        // 为每个 page 设置 是否启用请求拦截
        if (this.#setRequestInterception) {
            page.setRequestInterception(...this.#setRequestInterception);
            if (this.#setDefaultRequestInterception) {
                let blockTypes = new Set(['image', 'media', 'font']);
                page.on('request', (req) => {
                    const type = req.resourceType();
                    if(blockTypes.has(type)){
                        //直接阻止请求
                        return req.abort();
                    }else{
                        //对请求重写
                        return req.continue();
                    }
                })
            }
            // 每一个 page 请求都发射到 browser
            page.on('request', (...args) => {
                this.#browser.emit('request', ...args);
            })
        }
        // 为每个 page 注入 addScriptTag
        page.on('domcontentloaded', async () => {
            if (this.#addScriptTag.length) {
                for (let args of this.#addScriptTag) {
                    try {
                        await page.addScriptTag(...args);
                    } catch (e) {
                        this.log(e);
                    }
                }
            }
        })

        return new Page({
            browser: this.#browser,
            page,
        });
    }
    evaluateOnNewDocument (...args) {
        this.#evaluateOnNewDocument.push(args);
    }
    addScriptTag (...args) {
        this.#addScriptTag.push(args);
    }
    setBypassCSP (...args) {
        this.#setBypassCSP = args;
    }
    setRequestInterception (...args) {
        this.#setRequestInterception = args;
    }
    // 默认拦截一些请求, 提高网页加载速度
    setDefaultRequestInterception (...args) {
        this.#setDefaultRequestInterception = args;
    }
}

class Page extends Util {
    #browser;
    #page;
    constructor ({ browser, page }) {
        super();

        this.#browser = browser;
        this.#page = page;
        // 暴露原生 page 对象
        this.src = page;
    }
    async goto (...args) {
        return await this.#page.goto(...args);
    }
}


module.exports = {
    launch: async options => {
        let browser = await PP.launch(options);
        return new Browser({
            browser,
            options,
        });
    }
}














