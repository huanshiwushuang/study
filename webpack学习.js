// 1、需要安装的包
// webpack webpack-cli
// style-loader css-loader
// file-loader
// csv-loader xml-loader
// 
// 2、html-webpack-plugin
// 解决的是：根据config自动重新生成index.html文件

// 3、clean-webpack-plugin
// 用于清理dist

// 4、 webpack-manifest-plugin
// 
// 5、devtool 例如：devtool: 'inline-source-map',
// 代码报错指出原始文件的位置 而不是bundle的位置

// 6、webpack --watch 
// 观察者模式会自动监听文件变动，重新编译文件，但是不会自动刷新浏览器内容

// 7、webpack-dev-server
// 提供了一个简易的web服务器，能实时重新加载
// 需要npm安装
// 需要在config中配置 devServer 告诉服务器在哪里查找文件进行加载
// 默认地址是 localhost:8080 

// 8、webpack-dev-middleware 这个还没看懂？？？
// 容易，webpack-dev-server 也使用了他，他会将webpack处理后的代码交给一个server
// 模块热替换：如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。

// 9、package.json 中的 sideEffects 表示 包模块在  tree-shaking 中是否有副作用
//      如果sideEffects 设置为false  webpack 会更加清晰的导入详情的模块，而不是模块的所有导出
// {
//     "name": "your-project",
//     "sideEffects": [
//       "./src/some-side-effectful-file.js",
//       "*.css"
//     ]
// }
// 最后，还可以在 module.rules 配置选项 中设置 "sideEffects"。
// 
// 10、代码压缩 加密丑化 uglifyjs
// mode: "production" 或者 命令行接口中使用 --optimize-minimize 或者 -p 标记，来使用 UglifyJSPlugin。
// 
// 11、webpack-merge
// 开发和生产环境的配置会有差异，所以会抽取出通用配置，使用此模块合并。
// 虽然 uglifyjs-webpack-plugin 压缩插件很好，还是有其他的选择：BabelMinifyWebpackPlugin、ClosureCompilerPlugin

// 12、关于 source-map 和 devtool
// 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。

// 13、一些插件可能会根据 环境变量作出优化，webpack可以指定环境变量。
// new webpack.DefinePlugin({
//   'process.env.NODE_ENV': JSON.stringify('production')
// })
// 
// 14、无法在webpack.config.js 中配置和引用NODE_ENV环境变量，但是可以在/src的js文件中使用
// 
// 15、ExtractTextPlugin插件，css的分离
// 
// 16、代码的丑化压缩 和 环境变量设置等也可以通过命令行实现
// --optimize-minimize 标记将在后台引用 UglifyJSPlugin。和以上描述的 DefinePlugin 实例相同，--define process.env.NODE_ENV="'production'" 也会做同样的事情。并且，webpack -p 将自动地调用上述这些标记，从而调用需要引入的插件。

// 17、代码分离有三种方式。
// 1-简单果断的通过配置入口文件，手动分离代码。
    // 会导致多次重复导入相同的模块在不同的chunk中，所以使用 CommonsChunkPlugin 防止重复
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称。
    // })
// 2-防止重复。4.0以前是通过CommonsChunkPlugin 插件。之后是通过 optimization.splitChunks 配置替代了

// 3-动态导入。动态导入也分两种。
    // 1 是标准的import() 
        // import() 特性依赖于内置的 Promise。如果想在低版本浏览器使用 import()，记得使用像 es6-promise 或者 promise-polyfill 这样 polyfill 库，来预先填充(shim) Promise 环境。
        // 注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。
    // 2 是webpack独有的require.ensure()



// 18、从 webpack 4.0 开始 CommonsChunkPlugin 被optimization.splitChunks和optimization.runtimeChunk配置项代替
// optimization: {
//     splitChunks: {
//        chunks: "async", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
//        minSize: 30000, // 最小尺寸，30000
//        minChunks: 1, // 最小 chunk ，默认1
//        maxAsyncRequests: 5, // 最大异步请求数， 默认5
//        maxInitialRequests : 3, // 最大初始化请求书，默认3
//        automaticNameDelimiter: '~',// 打包分隔符
//        name: function(){}, // 打包后的名称，此选项可接收 function
//        cacheGroups:{ // 这里开始设置缓存的 chunks
//            priority: 0, // 缓存组优先级
//            vendor: { // key 为entry中定义的 入口名称
//                chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async) 
//                test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
//                name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
//                minSize: 30000,
//                minChunks: 1,
//                enforce: true,
//                maxAsyncRequests: 5, // 最大异步请求数， 默认1
//                maxInitialRequests : 3, // 最大初始化请求书，默认1
//                reuseExistingChunk: true // 可设置是否重用该chunk
//            }
//        }
//     }
//    }


// 19、
// 以下是由社区提供的，一些对于代码分离很有帮助的插件和 loaders：
// ExtractTextPlugin: 用于将 CSS 从主应用程序中分离。
// bundle-loader: 用于分离代码和延迟加载生成的 bundle。
// promise-loader: 类似于 bundle-loader ，但是使用的是 promises。
// CommonsChunkPlugin 插件还可以通过使用显式的 vendor chunks 功能，从应用程序代码中分离 vendor 模块。

// 20、css 处理
// 以webpack4.0版本为例来演示CSS模块的处理方式，需要用到的插件及功能如下：

// style-loader——将处理结束的CSS代码存储在js中，运行时嵌入&lt;style&gt;后挂载至html页面上
// css-loader——加载器，使webpack可以识别css模块
// postcss-loader——加载器，下一篇将详细描述（？）
// sass-loader——加载器，使webpack可以识别scss/sass文件，默认使用node-sass进行编译
// mini-css-extract-plugin——插件，4.0版本启用的插件，替代原extract-text-webpack-plugin插件，将处理后的CSS代码提取为独立的CSS文件
// optimize-css-assets-webpack-plugin——插件，实现CSS代码压缩
// autoprefixer——自动化添加跨浏览器兼容前缀


































