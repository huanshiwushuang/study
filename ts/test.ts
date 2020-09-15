interface PageCommon {
    create();
    action();
}

class PageCommon implements PageCommon {
    constructor() {

    }
    async action() {
        await 1+1;
    }
}

let a = new PageCommon();

// 1、打开页面【url 打开，】
// 2、等待加载完成
// 3、执行代码，获取数据
// 