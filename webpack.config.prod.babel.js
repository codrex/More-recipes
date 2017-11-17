import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import webpack, { optimize } from 'webpack';
import common from './webpack.config.common.babel';

const { DedupePlugin, AggressiveMergingPlugin, UglifyJsPlugin } = optimize;

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer, precss]
              }
            }, 'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      minimize: true,
    }),
    new ExtractTextPlugin({
      filename: 'css/style.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new DedupePlugin(),
    new AggressiveMergingPlugin()
  ],
});

