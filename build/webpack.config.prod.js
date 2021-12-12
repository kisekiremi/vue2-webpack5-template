'use strict'

const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const Utils = require('./utils')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      minRemainingSize: 0,
      maxAsyncRequests: 50,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  devtool: 'source-map',

  /* 压缩打包JS */
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: Utils.assetsPath('js/[chunkhash].[name].js'),
    chunkFilename: Utils.assetsPath('js/[chunkhash].[id].js')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        mode: '"production"'
      }
    }),

    // 压缩打包CSS
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css'
    }),

    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      favicon: 'favicon.ico',
      hash: true,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    // 打包分析器
    new BundleAnalyzerPlugin({
      analyzerHost: 'localhost',
      analyzerPort: 9999,
      // 不默认打开，诶，就是皮
      openAnalyzer: true
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.ids.HashedModuleIdsPlugin(),

    // // 预渲染
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, '../dist'),
      // 列出需要预渲染的路由
      routes: ['/', '/home', '/secondPage'],

      rendererOptions: {
        headless: true,
        renderAfterDocumentEvent: 'render-event',
        inject: {},
        timeout: 10000
      }
    }),

    // gzip文件打包出 gz br
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      filename: '[path][query].gz',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      filename: '[path][query].br',
      algorithm: 'brotliCompress',
      compressionOptions: {
        level: 11
      },
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})
