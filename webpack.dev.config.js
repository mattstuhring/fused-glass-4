const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client/main-client.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'client-bundle.js'
  },
  target: 'web',
  resolve: {
    alias: {
      applicationStyles:  path.resolve(__dirname, 'src/client/styles/App.scss'),
      About:              path.resolve(__dirname, 'src/client/components/About'),
      AuthService:        path.resolve(__dirname, 'src/client/components/services/AuthService'),
      Cart:               path.resolve(__dirname, 'src/client/components/Cart'),
      Categories:         path.resolve(__dirname, 'src/client/components/products/product/Categories'),
      Collections:        path.resolve(__dirname, 'src/client/components/products/product/Collections'),
      Contact:            path.resolve(__dirname, 'src/client/components/Contact'),
      Gallery:            path.resolve(__dirname, 'src/client/components/Gallery'),
      Header:             path.resolve(__dirname, 'src/client/components/Header'),
      Home:               path.resolve(__dirname, 'src/client/components/Home'),
      Login:              path.resolve(__dirname, 'src/client/components/Login'),
      Main:               path.resolve(__dirname, 'src/client/components/Main'),
      Navigation:         path.resolve(__dirname, 'src/client/components/Navigation'),
      ProductAdd:         path.resolve(__dirname, 'src/client/components/products/ProductAdd'),
      ProductDetails:     path.resolve(__dirname, 'src/client/components/products/ProductDetails'),
      ProductUpdate:      path.resolve(__dirname, 'src/client/components/products/ProductUpdate'),
      SideNav:            path.resolve(__dirname, 'src/client/components/SideNav')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: [
          { loader: 'url-loader?limit=100000' }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/client/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
