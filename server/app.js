import fs from 'fs'
import path from 'path'
import express from 'express'
import logger from 'morgan'
import methodOverride from 'method-override'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import responseTime from 'response-time'
import compression from 'compression'
import errorHandler from 'errorhandler'
import route from './route'
import frontMiddleware from './front-middleware'
import { ENV, ROOT } from './config'

const app = express()
export default app

app.set('etag', false)
app.enable('trust proxy')

logger.token('date', () => new Date().toString())

// logger
if (ENV === 'production') {
	const logPath = path.join(ROOT, 'access.log')
	const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' })
	app.use(logger('combined', { stream: accessLogStream }))
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

// error handle last
if (ENV === 'development') {
	app.use(errorHandler())
}

// frontend webpack watch
if (ENV === 'development') {
	frontMiddleware(app)
}

// route
route(app)
