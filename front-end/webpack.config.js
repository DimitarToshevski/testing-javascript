const path = require('path');

module.exports = {
  entry: './assets/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/dist',
  },
  devServer: {
    contentBase: './',
  },
};
