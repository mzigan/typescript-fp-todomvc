const path = require('path');

module.exports = {
    entry: './src/app.ts',
    // devtool: 'inline-source-map',
    module: {
        rules: [
          {
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
    resolve: {
      extensions: [ '.ts', '.js' ],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'js/'),
    },
    mode: 'production', 
  };