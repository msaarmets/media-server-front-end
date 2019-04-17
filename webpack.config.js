const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');   // use template to generate index.html

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader', // creates style nodes from JS strings, development only
          'css-loader', // translates CSS into CommonJS (into a string)
          'sass-loader' // compiles Sass to CSS
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: ['file-loader']
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        loader: 'html-loader?attrs[]=video:src'
      }, {
        test: /\.mp4$/,
        exclude: /(node_modules)/,
        loader: 'url?limit=10000&mimetype=video/mp4'
      }
    ]
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    hotOnly: true,
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  plugins: [ 
    new webpack.HotModuleReplacementPlugin(),
    
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      inject: true
   })   
 ]
};

/*
In production
Usually, it's recommended to extract the style sheets into a dedicated file
 in production using the MiniCssExtractPlugin. This way your styles are not dependent on JavaScript:
 https://github.com/webpack-contrib/sass-loader
*/