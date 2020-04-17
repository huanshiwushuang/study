/*
 * @Author: your name
 * @Date: 2020-04-17 23:38:50
 * @LastEditTime: 2020-04-17 23:44:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frp_gui_windowsd:\code\study\monkey\injection.js
 */
window.jq = jQuery.noConflict();
jq.extend({
    // util 工具
    util: {
        // url 解析为 obj
        parseUrl (url) {
            var a =  document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':',''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function(){
                    var ret = {},
                        seg = a.search.replace(/^\?/,'').split('&'),
                        len = seg.length, i = 0, s;
                    for (;i<len;i++) {
                        if (!seg[i]) { continue; }
                        s = seg[i].split('=');
                        ret[s[0]] ? ret[s[0]].push(s[1]) : (ret[s[0]] = [s[1]])
                    }
                    for (i in ret) {
                        if (ret[i].length == 1) {
                            ret[i] = ret[i][0]
                        }
                    }
                    return ret;
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
                hash: a.hash.replace('#',''),
                path: a.pathname.replace(/^([^\/])/,'/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
                segments: a.pathname.replace(/^\//,'').split('/')
            }
        },
        // 对象 转 url参数字符串
        objToQS (obj) {
            return Object.keys(obj).reduce(function (sum, item) {
                return sum.push(item + '=' + obj[item]) && sum
            }, []).join('&');
        },
        // 更新 url querystring
        updateQueryString (url, qsObj) {
            var urlObj = this.parseUrl(url);
            return [
                urlObj.protocol,
                '://',
                urlObj.host,
                ':',
                urlObj.port,
                urlObj.path,
                (function () {
                    if (Object.keys(urlObj.params).length > 0) {
                        return '?'+this.objToQS(jq.extend(urlObj.params, qsObj))
                    }
                    return '?'+this.objToQS(qsObj)
                }.bind(this))(),
                (function () {
                    return urlObj.hash && ('#'+urlObj.hash)
                })()
            ].join('')
        },
        // 解析Unicode字符串
        parseUnicode (str) {
            return unescape(str.replace(/\\u/g, "%u"));
        },
        // 保存文件
        saveFile (str, name) {
            var a = document.createElement('a');
            a.download = name || 'injection.txt';
            a.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([str]);
            a.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(a);
            a.click();
            // 然后移除
            document.body.removeChild(a);
        },
        // 保存 JSON
        saveJSON (data, name) {
            data = JSON.stringify(data, undefined, 4);
            this.saveFile(data, name);
        }
    },
});
if (jq.util.parseUrl(location.href).source.match(/.*\.baidu\.com/)) {
    jq(function () {
        
    })
}
