const path = require('path');

// 项目根目录
exports.appRoot = path.resolve(__dirname, '..');
// 资源根目录
exports.appPublic = path.resolve(exports.appRoot, './public/static');
// 源码根目录
exports.appSrc = path.resolve(exports.appRoot, './src');




