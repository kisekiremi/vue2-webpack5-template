'use strict'

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const utils = require('./utils')

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: {
    app: './src/main.js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      views: utils.resolve('src/views'),
      static: utils.resolve('static'),
      components: utils.resolve('src/components')
    }
  },

  // /* externals中的key是后面需要require的名字，value是第三方库暴露出来的方法名 */
  // externals: {
  //   /**
  //    * 这个方法名不是自己导入的命名
  //    *
  //    * 例子如下：
  //    * vue: 'Vue',
  //    * 'vue-router': 'VueRouter'
  //    */
  // },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('static'),
          to: utils.resolve('dist/static'),
          toType: 'dir'
        }
      ]
    })
  ]
}
