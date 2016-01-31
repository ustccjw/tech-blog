import http from 'http'
import tmpApp from './app'
import { PORT } from './config'

let app = tmpApp
const server = http.createServer()
server.on('request', app)
server.listen(PORT, () =>
	console.log('Express server listening on port ' + PORT))

export default server

if (module.hot) {
	module.hot.accept('./app', () => {
		let hotApp = null
		try {
			hotApp = require('./app').default
		} catch (err) {
			console.error(err.stack)
			return
		}
		server.removeListener('request', app)
		app = hotApp
		server.on('request', app)
	})
}
