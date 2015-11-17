import http from 'http'
import tempApp from './'

let app = tempApp
const server = http.createServer()
server.on('request', app)
server.listen(app.get('PORT'), () =>
	console.log('Express server listening on port ' + app.get('PORT')))

export default server

if (module.hot) {
	module.hot.accept('./', () => {
		let hotApp = null
		try {
			hotApp = require('./')
		} catch (error) {
			console.error(error.stack)
			return
		}
		server.removeListener('request', app)
		app = hotApp
		server.on('request', app)
	})
}
