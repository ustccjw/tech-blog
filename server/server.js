import http from 'http'
import app from './'

let hotApp = app
const server = http.createServer()
server.on('request', hotApp)
server.listen(app.get('PORT'), () =>
	console.log('Express server listening on port ' + app.get('PORT')))

export default server

if (module.hot) {
	module.hot.accept('./', () => {
		try {
			hotApp = require('./')
		} catch (error) {
			console.error(error.stack)
			return
		}
		server.removeListener('request', hotApp)
		server.on('request', hotApp)
	})
}
