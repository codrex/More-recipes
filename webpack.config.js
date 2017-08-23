const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './client/src/index',
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './client/dist',
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['happypack/loader?id=css'],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['happypack/loader?id=RHMR'],
      },
      {
        test: /\.(ttf|eot|png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'testing',
      template: './client/src/index.html',
    }),
    new CleanWebpackPlugin(['dist']),
    new HappyPack({
      id: 'RHMR',
      threads: 4,
      loaders: ['react-hot-loader/webpack', 'babel-loader'],
    }),
    new HappyPack({
      id: 'css',
      threads: 2,
      loaders: ['style-loader', 'css-loader'],
    }),
  ],
};
