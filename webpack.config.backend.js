'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

let nodeModules = {}
fs.readdirSync('node_modules').
	filter(x => ['.bin'].indexOf(x) === -1).
	forEach(mod => nodeModules[mod] = 'commonjs ' + mod)

module.exports = {
	entry: './server/server.js',
	target: 'node',
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
		}]
	},
	node: {
		__filename: true,
		__dirname: false,
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'backend.js',
	},
	externals: nodeModules,
	plugins: [
		new webpack.BannerPlugin('require("source-map-support").install();',
			{raw: true, entryOnly: false}),
	],
	devtool: 'sourcemap',
}
