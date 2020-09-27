// ==UserScript==
// @name         injection
// @namespace    http://513902.xyz/
// @version      0.1
// @description  js injection
// @author       gh
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @require      https://unpkg.com/ajax-hook@2.0.2/dist/ajaxhook.min.js
// @require      https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js
// @require      https://cdn.bootcss.com/localforage/1.7.3/localforage.min.js
// ==/UserScript==

window.jq = jQuery;
// window._open = window.open;

jq.extend(!0, {
    util: {
        urlParse: function(e) {
            var t, i = this, n = (e = e.toString()).match(/([a-zA-Z]+):\/\/([^\/:]+)(:\d+)?(\/[^?]*)?(\?[^#]*)?(#.*)?/);
            return {
                source: e,
                protocol: n[1],
                host: n[2],
                port: n[3] ? n[3].slice(1) : "",
                path: n[4] ? n[4] : "",
                segments: n[4] ? n[4].replace(/^\//, "").replace(/\/$/, "").split("/") : "",
                query: n[5] ? n[5] : "",
                params: (t = n[5] ? n[5] : "",
                i.qsToMap(t.slice(1))),
                hash: n[6] ? n[6].slice(1) : "",
                relative: (n[4] ? n[4] : "") + (n[5] ? n[5] : "") + (n[6] ? n[6] : "")
            }
        },
        urlStringify: function(t) {
            return [t.protocol, "://", t.host, t.port ? ":" + t.port : "", t.path, function() {
                var e = this.mapToQs(t.params);
                return e && "?" + e
            }
            .bind(this)(), t.hash ? "#" + t.hash : ""].join("")
        },
        mapToQs: function(e) {
            return [].concat(_toConsumableArray(e)).reduce(function(e, i) {
                var t;
                return t = Array.isArray(i[1]) ? i[1].reduce(function(e, t) {
                    return e.push(i[0] + "=" + t),
                    e
                }, []).join("&") : i[0] + "=" + i[1],
                e.push(t),
                e
            }, []).join("&")
        },
        qsToMap: function(e) {
            for (var t, i = new Map, n = e.split("&"), a = n.length, o = 0; o < a; o++)
                n[o] && (t = n[o].split("="),
                i.has(t[0]) ? i.get(t[0]).push(t[1]) : i.set(t[0], [t[1]]));
            return i.forEach(function(e, t) {
                1 == e.length && i.set(t, e[0])
            }),
            i
        },
        qsEncode: function(e) {
            var t = $.util.qsToMap(e);
            return t.forEach(function(i, e) {
                Array.isArray(i) ? i.forEach(function(e, t) {
                    i[t] = encodeURIComponent(e)
                }) : t.set(e, encodeURIComponent(i))
            }),
            this.mapToQs(t)
        },
        qsDecode: function(e) {
            var t = $.util.qsToMap(e);
            return t.forEach(function(i, e) {
                Array.isArray(i) ? i.forEach(function(e, t) {
                    i[t] = decodeURIComponent(i[t])
                }) : t.set(e, decodeURIComponent(i))
            }),
            this.mapToQs(t)
        },
        arrToQs: function(e) {
            return e.reduce(function(e, t) {
                return e.push(t.name + "=" + t.value),
                e
            }, []).join("&")
        },
        qsUpdate: function(e, t) {
            var i = this.urlParse(e);
            return Object.keys(t).forEach(function(e) {
                i.params.set(e, t[e])
            }),
            this.urlStringify(i)
        },
        qsUpdateAll: function(e, t) {
            var i = this.urlParse(e);
            return i.params = this.qsToMap(t),
            this.urlStringify(i)
        },
        verifyChinaPhone: function(e) {
            return /^\d{11}$/.test(e)
        },
        verifyPwd: function(e) {
            return 8 <= e.length && e.length <= 20 && (!(!/[a-z]/i.test(e) || !/[0-9]/.test(e)) || (!(!/[a-z]/i.test(e) || !/\W/.test(e)) || !(!/[0-9]/.test(e) || !/\W/.test(e))))
        },
        verifyEmail: function(e) {
            return /^[^@]+@[^@]+$/.test(e)
        },
        setInterval: function(i, t) {
            for (var e = arguments.length, n = Array(2 < e ? e - 2 : 0), a = 2; a < e; a++)
                n[a - 2] = arguments[a];
            var o, s, r = this, l = (s = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            new Promise(function(e, t) {
                                i.bind(window, {
                                    resolve: e,
                                    reject: t,
                                    more: n
                                })()
                            }
                            );
                        case 2:
                            o = setTimeout(l, t);
                        case 3:
                        case "end":
                            return e.stop()
                        }
                }, e, r)
            })),
            function() {
                return s.apply(this, arguments)
            }
            );
            return o = setTimeout(l, t),
            function() {
                return o
            }
        },
        strToObj: function strToObj(str) {
            return eval("(" + str + ")")
        },
        formatMilliseconds: function(e) {
            var t = new Date(e);
            return [t.getFullYear(), "-", ("0" + (t.getMonth() + 1)).slice(-2), "-", ("0" + t.getDate()).slice(-2), " ", ("0" + t.getHours()).slice(-2), ":", ("0" + t.getMinutes()).slice(-2), ":", ("0" + t.getSeconds()).slice(-2)].join("")
        }
    }
})

var ahConfig = {
    //请求发起前进入
    onRequest (config, handler) {
        debugger
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

