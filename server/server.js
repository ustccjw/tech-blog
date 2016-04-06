import http from 'http'
import { PORT } from './config'

let serverListener = null
const server = http.createServer()

const startServer = () => {
	if (serverListener) {
		server.removeListener('request', serverListener)
	}
	serverListener = require('./app').default
	server.on('request', serverListener)
	server.listen(PORT, () =>
		console.log('Express server listening on port ' + PORT))
}

if (module.hot) {
	module.hot.accept('./app', () => {
		try {
			startServer()
		} catch (err) {
			console.error(err.stack)
		}
	})
}

startServer()

export default server
