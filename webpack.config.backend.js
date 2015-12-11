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
		path: path.join(__dirname, 'dev'),
		filename: 'backend.js',
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.scss', '.css'],
	},
	node: {
		__filename: true,
		__dirname: false,
	},
	module: {
		loaders: [{
			test: /(\.js|\.jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel',
		}, {
			test: /\.(png|jpg|jpeg)$/,
			loader: 'url?limit=3072',
		}],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.BannerPlugin('require("source-map-support").install();', {
			raw: true,
			entryOnly: false,
		}),
		new webpack.NormalModuleReplacementPlugin(/(\.scss|\.css)$/,
			path.join(__dirname, 'node_modules/node-noop/index.js')),
	],
	externals: nodeModules,
	devtool: 'sourcemap',
}
