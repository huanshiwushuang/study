// webpack 配置合并
// https://www.npmjs.com/package/webpack-merge
const { merge } = require("webpack-merge");

const commonConfig = require("./config.common");
const developmentConfig = require("./config.development");
const productionConfig = require("./config.production")

module.exports = function (env) {
    if (env && env.development) {
        return merge(commonConfig, developmentConfig);
    } else if (env && env.production) {
        return merge(commonConfig, productionConfig);
    } else {
        throw new Error('No matching configuration was found!');
    }
}