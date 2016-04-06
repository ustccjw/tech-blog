import path from 'path'
import fs from 'mz/fs'
import favicon from 'serve-favicon'
import serveStatic from 'serve-static'
import falcorMiddleware from 'falcor-express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, createRoutes } from 'react-router'
import AsyncProps, { loadPropsOnServer } from '../../lib/async-props'
import template from 'es6-template-strings'
import ModelRouter from './model-router'
import routes from '../../route'
import { dataModel } from '../../model'
import { safeScript } from '../../util'
import { ENV, ROOT } from '../config'

const route = app => {

	// public resource
	app.use(favicon(path.join(ROOT, 'public/favicon.ico')))
	app.use(serveStatic(path.join(ROOT, 'public'), { maxAge: '1d' }))
	app.use(serveStatic(path.join(ROOT, 'dist'), { maxAge: '1d' }))

	// route
	app.use('/model.json', falcorMiddleware.dataSourceRoute((req, res) => {
		return new ModelRouter(req.cookies.userId)
	}))

	const templatePath = ENV === 'development' ?
		path.join(ROOT, 'view/dev-index.html') :
		path.join(ROOT, 'view/index.html')

	// default index
	app.get('*', (req, res, next) => {
		match({ routes, location: req.url },
			async (err, redirect, renderProps) => {
			try {
				if (err) {
					throw err
				}
				const asyncProps = await loadPropsOnServer(renderProps)
				const props = { ...renderProps, ...asyncProps }
				const appHTML = renderToString(React.createElement(AsyncProps,
					props))
				const htmlTemplate = await fs.readFile(templatePath)
				const dataCache = JSON.stringify(dataModel.getCache())
				const scriptTag = `<script>
					window.dataCache=${safeScript(dataCache)}
				</script>`
				const html = template(htmlTemplate, {
					html: appHTML,
					scriptTag,
				})
				dataModel.setCache(null)
				res.send(html)
			} catch (err) {
				next(err)
			}
		})
	})
}

export default route
