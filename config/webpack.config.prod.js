const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const rootDir = path.join(__dirname, '..')
const config = require('./webpack.config.dev.js')

// *** Configuration Settings ***

// Environment variables
const env = {
  __DEV__: false,
  'process.env': {
    FIREBASE_API_KEY: '""',
    FIREBASE_AUTH_DOMAIN: '""',
    FIREBASE_DATABASE_URL: '""'
  }
}

// Base URL for single page routing
const baseUrl = 'http://CHANGE-THIS-URL'

// *** End Configuration Settings ***

// Webpack config
config.plugins = [
  // Makes some environment variables available to the JS code
  new webpack.DefinePlugin(env),
  // Generates an `index.html` file with the <script> injected.
  new HtmlWebpackPlugin({
    template: path.join(rootDir, 'config/index.ejs'),
    hash: true, // Bust the cache in SCA hosting cloudflare
    baseUrl: baseUrl,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  // This helps ensure the builds are consistent if source hasn't changed:
  new webpack.optimize.OccurrenceOrderPlugin(),
  // Minify the code.
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false,
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  })
]

module.exports = config
