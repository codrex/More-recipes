import merge from 'webpack-merge';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import common from './webpack.config.common.babel';

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                precss,
                autoprefixer
              ];
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      },
    ],
  },
});
