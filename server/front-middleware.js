import webpack from 'webpack'
import config from '../webpack.config.frontend'

const frontMiddleware = app => {
	const compiler = webpack(config)
	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			cached: false,
			cachedAssets: false,
			colors: true,
			exclude: ['node_modules'],
		},
	}))
	app.use(require('webpack-hot-middleware')(compiler))
}

export default frontMiddleware
