/**
 * Responsibility: Webpack config for development env
 */
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const path = require('path')
const rootDir = path.join(__dirname, '..')

// *** Configuration Settings ***
const NODE_ENV = 'development'

// Environment variables
process.env.NODE_ENV = NODE_ENV
const env = {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
    FIREBASE_API_KEY: '""',
    FIREBASE_AUTH_DOMAIN: '""',
    FIREBASE_DATABASE_URL: '""'
  }
}

// Base URL for single page routing
const baseUrl = 'http://localhost:8000/'

// *** End Configuration Settings ***

// Webpack config
const config = {
  context: path.join(rootDir, '/src'),
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8000',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    './index.js'
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './public',
    port: 8000
  },

  output: {
    filename: 'bundle.js',
    path: path.join(rootDir, '/public')
  },

  resolve: {
    modules: ['node_modules', 'src']
  },

  module: {
    loaders: [
      // Process JS files with babel
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Makes some environment variables available to the JS code
    new webpack.DefinePlugin(env),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: path.join(rootDir, 'config/index.ejs'),
      baseUrl: baseUrl
    }),

    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin()
  ]
}

module.exports = config
