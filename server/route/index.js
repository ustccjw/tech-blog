import path from 'path'
import fs from 'mz/fs'
import favicon from 'serve-favicon'
import serveStatic from 'serve-static'
import errorHandler from 'errorhandler'
import falcorMiddleware from 'falcor-express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, createRoutes } from 'react-router'
import AsyncProps, { loadPropsOnServer } from 'async-props'
import template from 'es6-template-strings'
import app from '../app'
import ModelRouter from './model-router'
import routes from '../../route'
import { dataModel } from '../../model'
import { safeScript } from '../../util'

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
	match({ routes, location: req.url }, async (err, redirect, renderProps) =>
	{
		const asyncProps = await loadPropsOnServer(renderProps)
		const props = { ...renderProps, ...asyncProps }
		const appHTML = renderToString(React.createElement(AsyncProps,
			props))
		const htmlTemplate = await fs.readFile(path.join(app.get('ROOT'),
			'view/index.html'))
		const dataCache = safeScript(JSON.stringify(dataModel.getCache()))
		const scriptTag = `<script>
			window.dataCache=${dataCache}
		</script>`
		const html = template(htmlTemplate, {
			html: appHTML,
			scriptTag,
		})
		res.send(html)
		dataModel.setCache(null)
	})
})


// error handle last
if (process.env.NODE_ENV !== 'production') {
	app.use(errorHandler())
}
