const {resolve} = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
            limit: 8192,
            },
        type: 'javascript/auto'
      }
    ]
  }
}