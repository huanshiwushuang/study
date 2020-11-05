const path = require('path');
const { appRoot } = require('../config.app');

module.exports = {
    // webpack 的主目录
    // entry 和 module.rules.loader 选项
    // 相对于此目录解析
    context: appRoot
}