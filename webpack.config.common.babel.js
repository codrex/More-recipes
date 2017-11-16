import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import webpack from 'webpack';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: [
      './client/src/index.jsx',
    ],
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[path][name].[ext]',
              prefix: 'font',
              exclude: '/node_modules/'
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
    }),
    new HtmlWebpackPlugin({
      title: 'MoreRecipes',
      template: './client/src/index.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ],
};
