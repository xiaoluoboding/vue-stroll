var path = require('path')
var webpack = require('webpack')
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
var pkg = require('./package.json')
var banner = `${pkg.name} v${pkg.version}\n${pkg.description}\n${pkg.homepage}\n@author ${pkg.author}`

module.exports = {
  entry: './src/vue-stroll.vue',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    library: 'vue-stroll',
    libraryTarget: 'umd',
    filename: 'vue-stroll.min.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new UnminifiedWebpackPlugin(),
    new webpack.BannerPlugin(banner)
  ])
}
