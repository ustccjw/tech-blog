'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
		extensions: ['', '.jsx', '.js', '.scss', '.css'],
	},
	module: {
		loaders: [{
			test: /(\.js|\.jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel',
		}, {
			test: /(\.scss|\.css)$/,
			loader: ExtractTextPlugin.extract('style',
				'css?sourceMap!postcss!sass?sourceMap'),
		}, {
			test: /\.(png|jpg|jpeg)$/,
			loader: 'url?limit=3072',
		}],
	},
	externals: {
		'falcor': 'falcor',
		'falcor-http-datasource': 'falcor.HttpDataSource',
	},
	postcss: [autoprefixer],
	plugins: [
		new ExtractTextPlugin('main.css'),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new webpack.NormalModuleReplacementPlugin(/^async-props$/,
			path.join(root, 'fix_modules/async-props/index.jsx')),
	],
	devtool: 'inline-source-map',
}
