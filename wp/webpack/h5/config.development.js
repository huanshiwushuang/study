const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const { appPublic } = require('../config.app');

module.exports = {
    // 通过命令行传递此参数
    // mode: 'development',
    entry: {
        a: './src/1.js',
        b: ['./src/2.js', './src/3.js']
    },
    output: {
        path: path.resolve(appPublic, ''),
        filename: '[name].[contenthash].js',
        // publicPath: "http://cdn.example.com/assets/[hash]/"
    },
    module: {
        // rules: [
        //     {
        //         test: /\.css$/,
        //         use: [
        //             { loader: 'style-loader' },
        //             {
        //                 loader: 'css-loader',
        //                 options: {
        //                     modules: true
        //                 }
        //             }
        //         ]
        //     }
        // ]
    },
    plugins: [
        
    ]
}