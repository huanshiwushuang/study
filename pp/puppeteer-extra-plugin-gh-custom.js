const Axios = require('axios');
const PuppeteerExtra = require('puppeteer-extra');

// 构造插件所需的父类
// https://www.npmjs.com/package/puppeteer-extra-plugin
const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin');
// 插件-防检测
// https://www.npmjs.com/package/puppeteer-extra-plugin-stealth
const PuppeteerExtraPluginStealth = require('puppeteer-extra-plugin-stealth');

// 请求响应拦截 && 修改
// https://www.npmjs.com/package/puppeteer-interceptor
// patterns = {
//   Document: [Function],
//   Stylesheet: [Function],
//   Image: [Function],
//   Media: [Function],
//   Font: [Function],
//   Script: [Function],
//   TextTrack: [Function],
//   XHR: [Function],
//   Fetch: [Function],
//   EventSource: [Function],
//   WebSocket: [Function],
//   Manifest: [Function],
//   SignedExchange: [Function],
//   Ping: [Function],
//   CSPViolationReport: [Function],
//   Other: [Function],
//   All: [Function: All]
// }
// const { intercept, patterns, ERROR_REASON } = require('puppeteer-interceptor');

PuppeteerExtra.use(PuppeteerExtraPluginStealth())

class PuppeteerExtraPluginGhCustom extends PuppeteerExtraPlugin {
    constructor (opts = {}) {
        super(opts);
    }
    get name() {
        return 'gh-custom';
    }
    get defaults() {
        return {
        }
    }
    async onPageCreated(page) {
        await page.exposeFunction('setHasJq', (hasJq) => {
            page.hasJq = hasJq;
        })
        await page.evaluateOnNewDocument(() => {
            window.setHasJq(false);
        })
        page.on('response', res => {
            let contentType = res.headers()['content-type'];
            if (contentType) {

            }
        })

        // // 拦截所有 Script，之所以不拦截 Document 是因为 click 打开的窗口 在 CDP 协议的 Fetch.requestPasued 事件中有 bug
        // intercept(page, patterns.Script('*'), {
        //     onInterception: ({ request, resourceType, responseStatusCode, responseHeaders }, { abort, fulfill }) => {
        //     },
        //     onResponseReceived: async ({ error = null, request, response }) => {
        //         if (error) {
        //             this.debug(error)
        //             return;
        //         }
        //         // jQuery 注入
        //         if (!page.hasJq) {
        //             const res = await Axios.get('https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js');
        //             response.body = `
        //                 ${res.data}
        //                 var jq = jQuery.noConflict();
        //                 ${response.body}
        //             `;
        //             page.hasJq = true;
        //         }
        //         return response;
        //     }
        // });
    }
}

module.exports = function(opts) {
    return new PuppeteerExtraPluginGhCustom(opts)
}