'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		'./client/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'frontend.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.scss', '.css'],
	},
	module: {
		loaders: [{
			test: /(\.js|\.jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel',
		}, {
			test: /(\.scss|\.css)$/,
			loader: 'style!css?sourceMap!postcss!sass?sourceMap',
		}],
	},
	postcss: [autoprefixer],
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	devtool: 'inline-source-map',
}
