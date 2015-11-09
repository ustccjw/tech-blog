import http from 'http'
import app from './'

const server = http.createServer(app)
server.listen(app.get('PORT'), () =>
	console.log('Express server listening on port ' + app.get('PORT')))

export default server
