const path = require('path');

module.exports = {
  entry: './src/cardboard.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.json"
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    roots: [path.resolve('./src')],
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
  },
  output: {
    filename: 'cardboard.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
};