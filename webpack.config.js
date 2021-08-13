const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const PostCSSImport = require('postcss-import');
const PostCSSPresetEnv = require('postcss-preset-env');
const PostCSSCombineMediaQuery = require('postcss-combine-media-query');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  stats: {
    colors: true,
    preset: 'minimal'
  },
  performance: { hints: isDev ? false : 'warning' },
  // Eval does not work for css source maps
  // `All values enable source map generation except eval and false value.`
  // https://github.com/webpack-contrib/css-loader
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: [
    path.resolve(__dirname, 'src/assets/scripts/index.js'),
    path.resolve(__dirname, 'src/assets/styles/main.css'),
  ],
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, '_site/assets'),
    publicPath: '/assets/'
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css'
    })
  ],
  ...(!isDev && {
    optimization: {
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin()
      ]
    }
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  PostCSSImport,
                  PostCSSPresetEnv({
                    features: {
                      'custom-media-queries': true,
                      'gap-properties': false,
                      'nesting-rules': true,
                      'place-properties': false,
                    }
                  }),
                  PostCSSCombineMediaQuery,
                ]
              }
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|webp|avif|svg|woff2)$/i,
        type: 'asset',
        generator: {
          filename: `images/${isDev ? '[name][ext]' : '[contenthash][ext]'}`
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `fonts/${isDev ? '[name][ext]' : '[contenthash][ext]'}`
        }
      }
    ]
  },
  resolve: {
    alias: {
      // Helpful alias for importing assets
      assets: path.resolve(__dirname, 'src/assets')
    }
  }
};
