import path from 'path'
import favicon from 'serve-favicon'
import serveStatic from 'serve-static'
import errorHandler from 'errorhandler'
import falcorMiddleware from 'falcor-express'
import app from '../app'
import ModelRouter from './model-router'

// public resource
app.use(favicon(path.join(app.get('ROOT'), 'public/favicon.ico')))
app.use(serveStatic(path.join(app.get('ROOT'), 'public'), { maxAge: '1d' }))
app.use(serveStatic(path.join(app.get('ROOT'), 'dist'), { maxAge: '1d' }))

// route
app.use('/model.json', falcorMiddleware.dataSourceRoute((req, res) => {
	return new ModelRouter(req.cookies.userId)
}))


// default index
app.get('*', (req, res) => {
	res.sendFile(path.join(app.get('ROOT'), 'view/index.html'))
})


// error handle last
app.use(errorHandler())
