import fs from 'fs'
import path from 'path'
import express from 'express'
import logger from 'morgan'
import methodOverride from 'method-override'
import session from 'express-session'
import bodyParser from 'body-parser'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import responseTime from 'response-time'
import compression from 'compression'

const upload = multer()
const app = express()
export default app

app.set('PORT', process.env.PORT || 3000)
app.set('ROOT', path.join(__dirname, '../'))
app.disable('etag')

// logger
if ('production' === app.get('ENV')) {
	const logPath = path.join(app.get('ROOT'), 'log/access.log')
	const accessLogStream = fs.createWriteStream(logPath, {flags: 'a'})
	app.use(logger('combined', {stream: accessLogStream}))
} else {
	app.use(logger('dev'))
}

// http method override by X-HTTP-Method-Override
app.use(methodOverride())

// session save
app.use(session({
	resave: true,
	saveUninitialized: false,
	secret: 'ustccjw',
}))

// body,cookie parse
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// add X-Response-Time
app.use(responseTime())

// compress
app.use(compression())
