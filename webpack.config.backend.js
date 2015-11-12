'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const nodeModules = {}
fs.readdirSync('node_modules').
	filter(x => ['.bin'].indexOf(x) === -1).
	forEach(mod => nodeModules[mod] = 'commonjs ' + mod)

module.exports = {
	target: 'node',
	entry: [
		'webpack/hot/poll?1000',
		'./server/server.js',
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'backend.js',
	},
	node: {
		__filename: true,
		__dirname: false,
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
		}],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.BannerPlugin('require("source-map-support").install();', {
			raw: true,
			entryOnly: false,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	externals: nodeModules,
	devtool: 'sourcemap',
}
