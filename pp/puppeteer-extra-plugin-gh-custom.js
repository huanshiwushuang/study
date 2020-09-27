// const Axios = require('axios');
// const httpProxy = require('http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const PuppeteerExtra = require('puppeteer-extra');
// const { proxyRequest } = require('puppeteer-proxy');
// const http = require('http');
const { HttpProxyAgent } = require('http-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');


// const proxy = require('koa-server-http-proxy')
const Koa = require('koa');
const KoaConnect = require('koa-connect')
const app = new Koa();

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
            proxyPort: 9000
        }
    }
    // get requirements() {
    //     // 最后加载，等待 page load，然后注入 jq
    //     return new Set(['runLast']);
    // }
    // 插件注册之后，启动代理
    onPluginRegistered () {
        // proxy server
        app.use(async (ctx, next) => {
            console.log(ctx.origin);

            await KoaConnect(
                createProxyMiddleware({
                    target: ctx.origin,
                    ws: true,
                    // changeOrigin: true,
                    // agent: new SocksProxyAgent('socks://127.0.0.1:1080'),
                    agent: new HttpProxyAgent('http://127.0.0.1:8888'),
                    // toProxy: true,
                    // ignorePath: true,
                    xfwd: false,
                    // autoRewrite: true,

                    followRedirects: true,
                })
            )(ctx, next)
        });

        // app.use(() => {
        //     HttpProxyAgent
        // })
        app.listen(this.opts.proxyPort);
        // target server
        // const app2 = new Koa();

        // app2.use(async (ctx, next) => {
        //     console.log(ctx.url)
        //     console.log(ctx.origin)
        //     console.log(ctx.originalUrl)
        //     console.log(ctx.headers)
        //     console.log(ctx.host)
        //     console.log(ctx.path)
        //     ctx.querystring && console.log(ctx.querystring)
        //     console.log(ctx.method)
        //     console.log(ctx.protocol)
        //     console.log()

        //     ctx.body = `I'm target server~`;
        // });
        // app2.listen(8000)

        // console.info(`已启动 http 代理服务器，监听本地端口：${this.opts.proxyPort}，请主动设置浏览器代理地址~`);
    }
    async onPageCreated(page) {
        // page.on('request', (request) => {
        //     console.log(request.constructor);
        // })
        // await page.exposeFunction('setHasJq', (hasJq) => {
        //     page.hasJq = hasJq;
        // })
        // await page.evaluateOnNewDocument(() => {
        //     alert(Object.keys(window));
        // })

        // page.on('domcontentloaded', async () => {
        //     // 判断当前页面是否已有 requirejs
        //     let hasRequirejs = await page.evaluate(() => {
        //         return !!window.require;
        //     })
        //     // 
        //     if (!hasRequirejs) {
        //         try {
        //             await page.addScriptTag({
        //                 url: 'https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.min.js'
        //             })
        //             await page.addScriptTag({
        //                 content: `
        //                     require.config({
        //                         paths: {
        //                             jquery: ['https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min']
        //                         }
        //                     })
        //                 `,
        //             })
        //             await new Promise(() => {
        //                 require(['jquery'], (jquery) => {
        //                     window.jq = jquery;
        //                 })
        //             })
        //             for (let execItem of window.execItem) {
        //                 await execItem();
        //             }
        //         } catch (e) {
        //             console.log(e);
        //         }
        //     }
            
        // })

        
        // page.browser().on('targetchanged', target => {
            
        //     page.hasJq = false;
        // })

        // await Promise.all([
        //     page.waitForNavigation(),
        //     page.waitForSelector('body'),
        // ])
        

        // page.on('response', res => {
        //     if (!page.hasJq && /javascript/i.test(res.headers()['content-type'])) {
                
        //     }
        // })

        // // 拦截所有 Scriptx
        //     //         this.debug(error)
        //     //         return;
        //     //     }
        //     //     // jQuery 注入
        //     //     if (!page.hasJq) {
        //     //         const res = await Axios.get('https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js');
        //     //         response.body = `
        //     //             ${res.data}
        //     //             var jq = jQuery.noConflict();
        //     //             ${response.body}
        //     //         `;
        //     //         page.hasJq = true;
        //     //     }
        //     //     return response;
        //     // }
        // });
    }
}

module.exports = function(opts) {
    return new PuppeteerExtraPluginGhCustom(opts)
}