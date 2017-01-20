var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
  devtool: 'source-map',

  entry: './src',

  output: {
    path: path.join( __dirname, 'dist' ),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel-loader' ],
        include: path.join( __dirname, 'src' ),
      },
    ],
  }
};

