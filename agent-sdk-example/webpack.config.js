const path = require('path')

module.exports = {
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, './')
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  entry: './example.js',
  module: {
    rules: [
      {
        test: /^(?!.*\.spec\.js$).*\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    library: 'agent-sdk-example',
    libraryTarget: 'umd',
    filename: 'example.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    open: 'http://localhost:8123/index.html',
    port: 8123,
    static: {
      directory: __dirname,
      publicPath: '/'
    }
  }
}
