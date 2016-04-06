'use strict'

const path = require('path')
const webpack = require('webpack')

let root = __dirname
if (__dirname.endsWith('/dev')) {
	root = path.join(__dirname, '../')
}

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		'babel-polyfill',
		'./client/index.jsx',
	],
	output: {
		path: path.join(root, 'dev'),
		filename: 'frontend.js',
		publicPath: 'http://127.0.0.1:3000/',
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.css'],
	},
	module: {
		loaders: [{
			test: /(\.js|\.jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel',
		}, {
			test: /\.css$/,
			loader: 'style?sourceMap!css?sourceMap!postcss?sourceMap',
		}, {
			test: /\.(png|jpg|jpeg)$/,
			loader: 'url?limit=3072',
		}],
	},
	externals: {
		'falcor': 'falcor',
		'falcor-http-datasource': 'falcor.HttpDataSource',
	},
	postcss: [
		require('postcss-nested'),
		require('postcss-cssnext')({
			browsers: [ 'last 1 versions' ],
		})
	],
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	devtool: 'inline-source-map',
}
