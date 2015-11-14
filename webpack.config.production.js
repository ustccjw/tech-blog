'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const nodeModules = {}
fs.readdirSync('node_modules').
	filter(x => ['.bin'].indexOf(x) === -1).
	forEach(mod => nodeModules[mod] = 'commonjs ' + mod)

exports.backend = {
	target: 'node',
	entry: [
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
		new webpack.BannerPlugin('require("source-map-support").install();', {
			raw: true,
			entryOnly: false,
		}),
	],
	externals: nodeModules,
	devtool: 'sourcemap',
}

exports.frontend = {
	entry: [
		'babel-core/polyfill',
		'./client/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'dist'),
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
			loader: 'style!css!postcss!sass',
		}, {
			test: /\.(png|jpg|jpeg)$/,
			loader: 'url?limit=3072',
		}],
	},
	externals: {
		'highlight.js': 'hljs',
	},
	postcss: [autoprefixer],
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
				warnings: false,
			},
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
}
