const pp = require('puppeteer-core');
const fs = require('fs');
const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser')
var app = new Koa();

(async () => {
	var browser = await pp.launch({
		executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
		headless: false,
		defaultViewport: null,
		ignoreDefaultArgs: ['--enable-automation'],
		// slowMo: 200,
		args: [
			// '--remote-debugging-port=9222',
			// '--start-fullscreen',
			'--disable-blink-features=AutomationControlled'
		]
	});

	var page = await browser.newPage();
	// page.evaluateOnNewDocument(() => {
	// 	// delete navigator.__proto__.webdriver;
	// })


	// 数据库-网址
	await page.goto('http://app1.nmpa.gov.cn/data_nmpa/face3/base.jsp?tableId=129&tableName=TABLE129&title=%B7%C7%B4%A6%B7%BD%D2%A9%E5%E0%D1%A1%BC%B0%D7%AA%BB%BB%C4%BF%C2%BC%CA%FD%BE%DD%BF%E2-%BB%AF%D1%A7%D2%A9%C6%B7&bcId=154337002238250481700465178201');


	await page.waitForNavigation();
	await page.evaluate(() => {
		$('center').clone().appendTo($('body'));
	})

	// 加载指定页码列表
	// devPage

	// 加载指定详情
	// commitForECMA

	page.setRequestInterception(true);
	page.on('request', interceptedRequest => {
		interceptedRequest.abort();
	})

	app.use(KoaBodyParser());
	app.use(async (ctx, next) => {
		ctx.type = 'text/plain';
		switch (ctx.query.action) {
			// 加载列表
			case 'list':
				var page = ctx.query.action;
				ctx.body = await page.evaluate((data) => {
					return window.websiteEncrypt(data);
				}, ctx.request.body)
				break;
			// 加载详情
			case 'detail':
				var params = ctx.query.params;

				ctx.body = await page.evaluate((data) => {
					return window.websiteDecrypt(data);
				}, ctx.request.body)
				break;
			default:
				ctx.body = 'action 参数错误'
				console.error('action 参数错误');
		}
	}).listen(8081, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log(`http 服务开启在 8081 端口`);
	});


})()