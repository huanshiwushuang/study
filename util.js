// 工具函数
var u = {
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