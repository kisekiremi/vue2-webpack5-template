'use strict'

const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const HOST = 'localhost'
const PORT = 4000

module.exports = merge(baseConfig, {
  mode: 'development',

  devServer: {
    compress: true,
    host: HOST,
    port: PORT,
    open: true
  },

  devtool: 'eval-cheap-module-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        mode: '"development"'
      }
    })
  ]
})
