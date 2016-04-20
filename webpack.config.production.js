import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssNested from 'postcss-nested'
import postcssCssnext from 'postcss-cssnext'

const nodeModules = {}
fs.readdirSync('node_modules').
	filter(x => ['.bin'].indexOf(x) === -1).
	forEach(mod => {
		nodeModules[mod] = `commonjs ${mod}`
	})

exports.backend = {
	target: 'node',
	entry: [
		'babel-polyfill',
		'./server/server.js',
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'backend.js',
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.css'],
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
		new webpack.BannerPlugin('require("source-map-support").install();', {
			raw: true,
			entryOnly: false,
		}),
		new webpack.NormalModuleReplacementPlugin(/\.css$/,
			path.join(__dirname, 'node_modules/node-noop/index.js')),
	],
	externals: nodeModules,
	devtool: 'source-map',
}

exports.frontend = {
	entry: [
		'babel-polyfill',
		'./client/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'frontend.min.js',
		publicPath: '/',
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
			loader: ExtractTextPlugin.extract('style', 'css!postcss'),
		}, {
			test: /\.(png|jpg|jpeg)$/,
			loader: 'url?limit=3072',
		}],
	},
	externals: {
		falcor: 'falcor',
		'falcor-http-datasource': 'falcor.HttpDataSource',
	},
	postcss: [postcssNested, postcssCssnext],
	plugins: [
		new ExtractTextPlugin('main.min.css'),
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
