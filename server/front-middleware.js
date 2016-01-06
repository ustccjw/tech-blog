// this file modify will trigger multiple frontend webpack watch
// so it should restart server when this file is modified

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config.frontend'

const compiler = webpack(config)
const devMiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		cached: false,
		cachedAssets: false,
		colors: true,
		exclude: [ 'node_modules' ],
	},
})
const hotMiddleware = webpackHotMiddleware(compiler)

const frontMiddleware = app => {
	app.use(devMiddleware)
	app.use(hotMiddleware)
}

export default frontMiddleware
