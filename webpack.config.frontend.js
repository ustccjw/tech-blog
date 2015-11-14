'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

// const IP = '127.0.0.1'
const IP = '192.168.1.5'

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		'babel-core/polyfill',
		'./client/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'dev'),
		filename: 'frontend.js',
		publicPath: `http://${IP}:3000/`,
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	devtool: 'inline-source-map',
}
