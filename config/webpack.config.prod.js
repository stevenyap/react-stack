/**
 * Responsibility: Webpack config for production env
 * We have intentionally make this non-DRY as many configs can be
 * found in the development config.
 * The reason is to ensure there is no "accidental" adding of a config
 * in development which causes a problem/security in production
 */
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')

const path = require('path')
const rootDir = path.join(__dirname, '..')

// *** Configuration Settings ***
const NODE_ENV = 'production'

// Environment variables
process.env.NODE_ENV = NODE_ENV
const env = {
  __DEV__: false,
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
    FIREBASE_PROJECT_ID: '""',
    FIREBASE_API_KEY: '""',
    FIREBASE_AUTH_DOMAIN: '""',
    FIREBASE_DATABASE_URL: '""'
  }
}

// Base URL for single page routing
const baseUrl = 'http://CHANGE-THIS-URL'

// *** End Configuration Settings ***

// Webpack config
const srcPath = path.join(rootDir, '/src')
const config = {
  context: path.join(rootDir, '/src'),

  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: path.join(rootDir, '/public')
  },

  resolve: {
    modules: ['node_modules', 'src']
  },

  module: {
    rules: [
      // Process JS files with babel
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: require.resolve('babel-loader')
      }
    ]
  },

  plugins: [
    // Makes some environment variables available to the JS code
    new webpack.DefinePlugin(env),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: path.join(rootDir, 'config/index.ejs'),
      baseUrl: baseUrl,
      hash: true, // Bust the cache
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
    // ES6 aware minifier - default webpack uglify throws error when minifying non-es2015 node_modules
    new BabiliPlugin({}, { comments: false })
  ]
}

module.exports = config
