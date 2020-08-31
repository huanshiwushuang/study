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
window._open = window.open;

jq.extend(true, {
    // util 工具
    util: {
        // ****************************************************
        // url 解析为 obj
        urlParse (url) {
            var a =  document.createElement('a');
            a.href = url;
            // 可恶的 IE bug 必须要这句。否则无法正确获取到 protocol 等参数
            a.href = a.href;
            return {
                source: url,
                protocol: a.protocol.replace(':',''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (() => {
                    seg = a.search.replace(/^\?/,'');
                    return this.qsToMap(seg);
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
                hash: a.hash.replace('#',''),
                path: a.pathname.replace(/^([^\/])/,'/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
                segments: a.pathname.replace(/^\//,'').split('/')
            }
        },
        // url 对象转字符串
        urlStringify (obj) {
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
        // 对象 转 querystring
        mapToQs (map) {
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
        // querystring 转 对象
        qsToMap (str) {
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
        qsEncode (qs) {
            var map = $.util.qsToMap(qs);
            map.forEach((val, key) => {
                if (Array.isArray(val)) {
                    val.forEach((item, index) => {
                        val[index] = encodeURIComponent(val[index]);
                    })
                } else {
                    map.set(key, encodeURIComponent(val));
                }
            });
            return this.mapToQs(map);
        },
        // querystring 解码
        qsDecode (qs) {
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
        // jquery 序列化的数组，转 QS
        qsFromArr (arr) {
            return arr.reduce((sum, item) => {
                sum.push(item.name + '=' + item.value);
                return sum;
            }, []).join('&')
        },
        // ****************************************************
        // qs 单个替换
        qsUpdate (url, qsObj) {
            var urlObj = this.urlParse(url);
            Object.keys(qsObj).forEach(item => {
                urlObj.params.set(item, qsObj[item]);
            });
            return this.urlStringify(urlObj);
        },
        // qs 整个替换
        qsUpdateAll (url, qsStr) {
            var urlObj = this.urlParse(url);
            urlObj.params = this.qsToMap(qsStr);
            return this.urlStringify(urlObj);
        },
        // ****************************************************
        // 解析Unicode字符串
        parseUnicode (str) {
            return unescape(str.replace(/\\u/g, "%u"));
        },
        // ****************************************************
        // Array JSON to CSV
        json2CSV (arr) {
            var bomHead = '\ufeff';
            var str = bomHead + Object.keys(arr[0]).join(',') + '\r\n';

            arr.forEach((item, index) => {
                str += Object.values(item).join(',') + '\r\n';
            })
            return str;
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

// 请求池，限制并发数
// ah.ajaxPool = {
//     maxSize: 6,
//     penddingCount: 0,
//     // 排队的队列
//     list: [],
// };

// var ahConfig = {
//     //请求发起前进入
//     onRequest (config, handler) {
//         handler.next(config);
//     },
//     //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
//     onError (err, handler) {
//         handler.next(err)
//     },
//     //请求成功后进入
//     onResponse (response, handler) {
//         handler.next(response)
//     }
// };
// ah.proxy(ahConfig);



jq(async function () {
    var level = Number(jq.util.urlParse(location.href).params.get('level'));
    if (level !== level) {
        return;
    }
    // ******************************************************************************
    // 参数模板
    const QS_TPL = {
        level: null,
        winIndex: null,
    };
    // 消息模板
    const MSG_TPL = Object.assign({}, QS_TPL, {
        action: null,
        data: {}
    });
    // 等待函数
    var func = {
        // 等待指定毫秒
        waitMS (ms) {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    resolve(ms)
                }, ms || 800)
            })
        },
        // 一直等待DOM出现
        // 如果 arg1 参数为 function ，那么必须返回一个 jq 对象
        waitDOM (arg1) {
            return new Promise(function (resolve, reject) {
                var count = 1;
                var interval = setInterval(() => {
                    console.log('第 '+ (count++) +' 次检测 DOM：' + arg1);

                    var jqDOM = typeof arg1 === 'string' ? $(arg1) : arg1();

                    if (jqDOM[0]) {
                        clearInterval(interval);
                        console.log('已检测到：' + arg1);
                        resolve(jqDOM);
                    } else if (count > 1000) {
                        clearInterval(interval);
                        reject(new Error('等待检测 1000 次，DOM 未找到'));
                    }
                }, 500)
            })
        }
    }
    

    // DIV 覆盖页面，防止误触
    $('<div style="position: fixed;left: 0;top: 0;bottom: 0;right: 0;background: rgba(0,0,0, .2);z-index: 2147483647">').appendTo('body');

    // url 对象
    // var urlObj = jq.util.urlParse(location.href);
    switch (level) {
        case 0:
            // *************************************************************************************
            // 数据结构-树形结构-定义节点
            class Node {
                constructor ({ url } = {}) {
                    // 网址
                    this.urlObj = jq.util.urlParse(url);
                    // 父节点
                    this.parent = null;
                    // 子节点
                    this.children = [];
                    // 其他数据
                    this.data = null;
                }
                // 设置数据
                setData (data) {
                    this.data = data
                }
                // 获取数据
                getData () {
                    return this.data;
                }
                // 设置父节点
                setParent (parent) {
                    // 如果当前节点已经有父节点，必须先解除已有的父节点关系，防止关系错乱。
                    if (this.parent) {
                        throw new Error('已有父节点，请先删除父节点~');
                    }
                    this.parent = parent;
                    var index = parent.children.indexOf(this);
                    if (index === -1) {
                        parent.children.push(this);
                    }
                }
                // 获取父节点
                getParent () {
                    return this.parent;
                }
                // 删除父节点
                deleteParent () {
                    var index = this.parent.children.indexOf(this);
                    this.parent.children.splice(index, 1);
                    this.parent = null;
                }
                // 添加子节点
                addChild (child) {
                    child.setParent(this);
                }
                // 删除子节点
                deleteChild (child) {
                    child.deleteParent();
                }
                // 获取子节点
                getChildren () {
                    return this.children;
                }
                // 删除所有子节点
                deleteChildren () {
                    // 保证不被 splice 影响
                    [...this.children].forEach(item => {
                        item.deleteParent();
                    })
                }
            }
            // *************************************************************************************
            // 窗口配置
            var win = {
                // 窗口实例
                instance: {
                },
                // 最大窗口数量
                count: 6
            };
            // 打开窗口
            (() => {
                for (var i = 0; i < win.count; i++) {
                    win.instance[`win${i}`] = {
                        // 窗口是否空闲
                        isFree: true,
                        // 窗口句柄
                        handler: window.open(),
                    };
                }
            })();
            // *************************************************************************************
            // 动作函数
            var action = {
                openNext () {
                }
            }
            // *************************************************************************************
            window.top.root = new Node();
            // 自定义 level 打开逻辑
            (() => {
                var msgHolder = {
                    
                };
                var url = `//${location.hostname}${location.port && (':' + location.port) || ':80'}/yaopinzc?page=`;
                var index = 1;

                var level1 = new Node();

                var exec = {
                    // 初始化
                    init () {
                        for (var val of win.instance) {
                            root.addChild(new Node({
                                url: url + (index++)
                            }));
                            // val.handler.location = url + (index++);
                        }
                    }
                };

                exec.init();
                

            })();
            return;


            var winArr = [];
            var index = 1;
            var url = `//${location.hostname}${location.port || ':80'}/yaopinzc?level=1&page=`;

            for (var i = 0; i < 6; i++) {
                winArr.push(window.open());
            }
            func.waitMS();
            winArr.forEach(item => {
                item.location = url + (index++);
            })

            // window.onload = async () => {

            // }

            // window.onload = async function () {
            //     // 展开-初始
            //     $('#_easyui_textbox_input8').click();
            //     // box
            //     var box = await func.waitDOM('#_easyui_tree_1');
            //     // 展开国家
            //     box.find('.tree-hit').click();
            //     // 等待省份加载完毕
            //     var provinceUl = await func.waitDOM(function () {
            //         return box.next('ul')
            //     });
            //     // 展开省份
            //     provinceUl.find('li').each((index, item) => {
            //         $(item).find('.tree-hit').click();
            //     })
            //     // 等待市加载完毕
            //     await func.waitDOM(() => {
            //         return provinceUl.find('li:last-child').find('ul');
            //     })
            //     // 展开县
            //     var shiLi = provinceUl.find('>li>ul>li');
            //     shiLi.each((index, item) => {
            //         // await func.waitMS(200);
            //         $(item).find('.tree-hit').click();
            //     })
            //     // 等待县加载完毕
            //     await func.waitDOM(() => {
            //         return shiLi.eq(-1).find('>ul');
            //     })

            //     alert('end')
                

            //     console.log(provinceUl);



            //     return;

            //     // await func.await(2000);
            //     // 加载下拉列表
            //     // 第一次展开
            //     var box = $('#_easyui_tree_1')
            //     var initExpand = await func.waitDOM('#_easyui_textbox_input8');
            //     initExpand[0].click();
            //     // 展开国家
            //     box.find(' > span.tree-hit.tree-collapsed')[0].click()
            //     // 展开所有省
            //     $('body > div:nth-child(14) > div > ul > li > ul').find('li').each((index, item) => {
            //         $(item).find('.tree-hit.tree-collapsed')[0].click();
            //     })
            //     // 等到最后一个省加载完毕
            //     await func.waitDOM("$('#_easyui_tree_1 + ul > li:last-child').find('>ul')", 'eval');


            //     console.log(123)
            //     await func.waitMS();
            //     // 展开国家
            //     console.log(466)

            // }
            // var data = {};
            // var provinces = $('#medicalListDiv h2 a');
            

            // var winCount = 100;
            // var winRef = [];
            // // a 标签的下标
            // var cursorA = 0;
            // // 回调的次数
            // var callbackCount = 0;
            // var data = [];

            // // 启动空白窗口
            // for (var i = 0; i < winCount; i++) {
            //     winRef.push({
            //         winIndex: i,
            //         win: window.open(),
            //     })
            // }
            // // 收到窗口数据解析完成的 postMessage
            // window.addEventListener('message', function (e) {
            //     if (e.data) {
            //         if (e.data.tag === MSG_TPL.tag && e.data.type === MSG_TPL.type) {
            //             data.push(e.data.data);
            //             callbackCount++;
            //             console.log('回调数量：' + callbackCount);
            //             if (cursorA <= dataArr.length-1) {
            //                 winLoad(winRef[e.data.winIndex]);
            //             } else {
            //                 if (callbackCount >= dataArr.length) {
            //                     jq.util.saveJSON(data, '湖北省.json');
            //                     alert('结束了：' + callbackCount);
            //                 }
            //             }
            //         }
            //     }
            // })

            // // 初始加载
            // winRef.forEach((item, index) => {
            //     winLoad(item)
            // })
            
            // // 加载内容-单个窗口更新
            // function winLoad(item) {
            //     var url;
            //     url = [
            //         'http://wjw.hubei.gov.cn/bsfw/bmcxfw/snyljgcx',
            //         $(dataArr[cursorA++].TEXT).attr('href').slice('1')

            //     ].join('');
            //     url = jq.util.updateQueryString(url, $.extend(true, {}, QS_TPL, {
            //         level: 1,
            //         winIndex: item.winIndex
            //     }))
            //     item.win.location = url;
            // }
            break;
        case 1:
            // window.onload = function () {
            //     var urlObj = jq.util.parseUrl(location.href);
            //     var winIndex = urlObj.params.winIndex;
            //     var data = {
            //         url: urlObj.source
            //     };
            //     var jqList = jq('.table-responsive table tbody th,td');
            //     var key;
            //     // 数据解析
            //     for (var i = 0 ; i < jqList.length; i += 2) {
            //         key = jqList.eq(i).text().trim();
            //         if (key) {
            //             data[key] = jqList.eq(i+1).text().trim();
            //         }
            //     }
            //     window.opener.postMessage($.extend(true, {}, MSG_TPL, {
            //         data,
            //         winIndex
            //     }), '*')
            // }
            break;
    }
})