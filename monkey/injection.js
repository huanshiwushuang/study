// ==UserScript==
// @name         injection
// @namespace    http://513902.xyz/
// @version      0.1
// @description  js injection
// @author       gh
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js
// @require      https://unpkg.com/ajax-hook@2.0.2/dist/ajaxhook.min.js
// @require      https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js
// ==/UserScript==

window.jq = jQuery;
// 工具函数
window.u = {
    url: {
        // url字符串 转 url对象
        parse(url) {
            var reg = /([a-zA-Z]+):\/\/([^\/:]+)(:\d+)?(\/[^?]*)?(\?[^#]*)?(#.*)?/;
            url = url.toString();
            var arr = url.match(reg);
            return {
                source: url,
                protocol: arr[1],
                host: arr[2],
                port: arr[3] ? arr[3].slice(1) : '',
                path: arr[4] ? arr[4] : '',
                segments: (() => {
                    if (arr[4]) {
                        return arr[4].replace(/^\//,'').replace(/\/$/, '').split('/');
                    }
                    return '';
                })(),
                query: arr[5] ? arr[5] : '',
                params: (() => {
                    var seg = arr[5] ? arr[5] : '';
                    return this.qsToMap(seg.slice(1));
                })(),
                hash: arr[6] ? arr[6].slice(1) : '',
                relative: (arr[4] ? arr[4] : '') + (arr[5] ? arr[5] : '') + (arr[6] ? arr[6] : ''),
            }
        },
        // url对象 转 url字符串
        stringify(obj) {
            return [
                obj.protocol,
                '://',
                obj.host,
                (function () {
                    return obj.port ? (':' + obj.port) : '';
                })(),
                obj.path,
                // querystring
                (function () {
                    var paramsStr = this.mapToQs(obj.params);
                    return paramsStr && ('?' + paramsStr);
                }).bind(this)(),
                (function () {
                    return obj.hash ? ('#' + obj.hash) : '';
                })()
            ].join('')
        },
        // Map 转 querystring
        mapToQs(map) {
            return [...map].reduce(function (sum, item) {
                var el;
                if (Array.isArray(item[1])) {
                    el = item[1].reduce((su, ite) => {
                        su.push(item[0] + '=' + ite);
                        return su;
                    }, []).join('&');
                } else {
                    el = item[0] + '=' + item[1]
                }
                sum.push(el);
                return sum;
            }, []).join('&');
        },
        // querystring 转 Map
        qsToMap(str) {
            var ret = new Map(),
                seg = str.split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret.has(s[0]) ? ret.get(s[0]).push(s[1]) : (ret.set(s[0], [s[1]]));
            };
            ret.forEach((item, key) => {
                if (item.length == 1) {
                    ret.set(key, item[0]);
                }
            });
            return ret;
        },
        // querystring 编码
        qsEncode(qs) {
            var map = $.util.qsToMap(qs);
            map.forEach((val, key) => {
                if (Array.isArray(val)) {
                    val.forEach((item, index) => {
                        val[index] = encodeURIComponent(item);
                    })
                } else {
                    map.set(key, encodeURIComponent(val));
                }
            });
            return this.mapToQs(map);
        },
        // querystring 解码
        qsDecode(qs) {
            var map = $.util.qsToMap(qs);
            map.forEach((val, key) => {
                if (Array.isArray(val)) {
                    val.forEach((item, index) => {
                        val[index] = decodeURIComponent(val[index]);
                    })
                } else {
                    map.set(key, decodeURIComponent(val));
                }
            });
            return this.mapToQs(map);
        },
        // qs 单个替换
        qsUpdate(url, qsObj) {
            var urlObj = this.parse(url);
            Object.keys(qsObj).forEach(item => {
                urlObj.params.set(item, qsObj[item]);
            });
            return this.stringify(urlObj);
        },
        // qs 整个替换
        qsUpdateAll(url, qsStr) {
            var urlObj = this.parse(url);
            urlObj.params = this.qsToMap(qsStr);
            return this.stringify(urlObj);
        },
    },
    json: {
        // 将非标准的JSON字符串标准化
        normalize(str) {
            return str.replace(/[\s\t\r\n]/g, '').replace(/'/g, '"').replace(/([{,])([^"]+?):/g,'$1"$2":').replace(/,\s*([\]}])/g, '$1');
        }
    },
    util: {
        // setTimeout 模拟 setInterval
        setInterval(func, ms, ...more) {
            var id;
            var stop = false;
            var exec = async () => {
                if (!stop) {
                    var res = func(...more);
                    if (!res || !/promise/i.test(res.constructor.name)) {
                        throw new Error('执行函数需返回 Promise');
                    }
                    await res;
                    id = setTimeout(exec, ms);
                }
            }
            id = setTimeout(exec, ms);
            return {
                clearInterval () {
                    stop = true;
                    clearTimeout(id);
                }
            }
        }
    }
}
// 工具函数-扩展
$.extend(true, window.u, {
    util: {
        saveJSON({ json, name = 'download'}) {
            var blob = new Blob([JSON.stringify(json, null, '\t')], {
                type: "text/json;charset=utf-8"
            });
            var d = new Date();
            var now = Date.now();
            var iso = new Date(now - d.getTimezoneOffset()*60*1000).toISOString();
            saveAs(blob, `${now}-${iso}-${name}.json`);
        }
    }
})
// 请求拦截
var ahConfig = {
    //请求发起前进入
    onRequest (config, handler) {
        debugger
        handler.id = Date.now();
        handler.next(config);
    },
    //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
    onError (err, handler) {
        handler.next(err)
    },
    //请求成功后进入
    onResponse (response, handler) {
        handler.next(response)
    }
};
ah.proxy(ahConfig);
// 业务逻辑---------------------------------------------------------------------------------------------------------------------------
class Page {
    constructor() {
        this.pageNumber = this.getPageNumber();
        this.dataArray = this.getDataArray();
        this.prevPageDOM = this.getPrevPageDOM();
        this.nextPageDOM = this.getNextPageDOM();
    }
    getPageNumber() {
        return jq('.el-pager .number.active').text().trim();
    }
    getDataArray() {
        var data = [];
        var $header = jq('.el-table table').eq(0);
        var $body = jq('.el-table table').eq(1);

        var headerKey = [];
        $header.find('th').slice(1,-1).each((index, item) => {
            headerKey.push($(item).text().trim());
        })
        $body.find('tr').each((index, item) => {
            var line = [...$(item).find('td').slice(1)].map(item => {
                return $(item).text().trim();
            });
            var obj = {};
            headerKey.forEach((item, index) => {
                obj[item] = line[index];
            })
            data.push(obj);
        })
        return data;
    }
    getPrevPageDOM() {
        return $('.el-pager .number.active').prev().get(0);
    }
    getNextPageDOM() {
        return $('.el-pager .number.active').next().get(0);
    }
}
window.main = function () {

}

