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
const { intercept, patterns, ERROR_REASON } = require('puppeteer-interceptor');

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
        // 拦截所有 Document
        intercept(page, patterns.Document('*'), {
            onInterception: ({ request, resourceType, responseStatusCode, responseHeaders }, { abort, fulfill }) => {
            },
            onResponseReceived: ({ error = null, request, response }) => {
                if (error) {
                    return;
                }
                let contentType = response.headers.find(item => {
                    return /content-type/i.test(item.name);
                });
                // 如果 Document 是 html
                if (/text\/html/.test(contentType.value)) {
                    response.body = `
                        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
                        <script>
                            var jq = jQuery.noConflict();
                        </script>
                        ${response.body}
                    `;
                }
                return response;
            }
        });
    }
}

module.exports = function(opts) {
    return new PuppeteerExtraPluginGhCustom(opts)
}