const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const CSSSplitWebpackPlugin = require('./patch/CSSSplitWebpackPluginFix');

/** 开发环境 */
const DEV = process.env.NODE_ENV !== 'production';

module.exports = defineConfig({
  //基本路径
  publicPath: "/",
  transpileDependencies: true,
  productionSourceMap: false, //默认是true，
  /* vue.config.js支持webpack-chain写法 */
 chainWebpack: config =>{
    //开启gzip压缩
   if(!DEV){
    config.plugin('compressionPlugin')
    .use( new CompressionPlugin({
     filename: "[path][base].gz",
     algorithm:"gzip",
     test:productionGzipExtensions,  //所有匹配此{RegExp}的资产都会被处理
     threshold:512,   // 只处理大于此大小的资产。以字节为单位
     minRatio:0.8,    //只有压缩好这个比率的资产才能被处理
    deleteOriginalAssets:false //是否删除原资源
    }))
   }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          //vue单独打包
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/]vue(.*)[\\/]/,
            priority: 40,
            chunks: 'initial'
          },
          //element单独打包
          element: {
            name: 'chunk-element',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 30,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: DEV?[
      new BundleAnalyzerPlugin(),
    //   new CSSSplitWebpackPlugin({
    //     size: 4000,
    //     filename: 'dist/css/[name]-[part].[ext]'
    // }),
    ]:[
    //   new CSSSplitWebpackPlugin({
    //     size: 4000,
    //     filename: 'dist/css/[name]-[part].[ext]'
    // }),
    ],
    // module: {
    //   rules: [
    //     // 开启多线程打包
    //     {
    //       test: /\.js$/,
    //       include: /src\/*/,
    //       use: [
    //         {
    //           loader: 'thread-loader',
    //           options: {
    //             // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
    //             // 在 require('os').cpus() 是 undefined 时回退至 1
    //             // workers: 2
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // }
  },
  css: {
    // extract: DEV?{ignoreOrder: true}:true
  },
  
})

