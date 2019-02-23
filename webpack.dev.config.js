const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client/App.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app-bundle.js'
  },
  target: 'web',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      applicationStyles:  path.resolve(__dirname, 'src/client/styles/App.scss'),
      About:              path.resolve(__dirname, 'src/client/components/About'),
      AuthService:        path.resolve(__dirname, 'src/client/components/services/AuthService'),
      Cart:               path.resolve(__dirname, 'src/client/components/Cart.jsx'),
      Categories:         path.resolve(__dirname, 'src/client/components/products/product/Categories.jsx'),
      Collections:        path.resolve(__dirname, 'src/client/components/products/product/Collections.jsx'),
      Contact:            path.resolve(__dirname, 'src/client/components/Contact.jsx'),
      Gallery:            path.resolve(__dirname, 'src/client/components/Gallery.jsx'),
      Header:             path.resolve(__dirname, 'src/client/components/Header.jsx'),
      Home:               path.resolve(__dirname, 'src/client/components/Home.jsx'),
      Login:              path.resolve(__dirname, 'src/client/components/Login.jsx'),
      Main:               path.resolve(__dirname, 'src/client/components/Main.jsx'),
      Navigation:         path.resolve(__dirname, 'src/client/components/Navigation.jsx'),
      Product:            path.resolve(__dirname, 'src/client/components/products/Product.jsx'),
      Products:           path.resolve(__dirname, 'src/client/components/products/Products.jsx'),
      ProductAdd:         path.resolve(__dirname, 'src/client/components/products/ProductAdd.jsx'),
      ProductDetails:     path.resolve(__dirname, 'src/client/components/products/ProductDetails.jsx'),
      ProductUpdate:      path.resolve(__dirname, 'src/client/components/products/ProductUpdate.jsx'),
      SideNav:            path.resolve(__dirname, 'src/client/components/SideNav.jsx')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
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
