import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory as history } from 'react-router'
import Loader from 'halogen/PacmanLoader'
import AsyncProps from '../lib/async-props'

let rootElement = document.querySelector('main')
if (!rootElement) {
	const body = document.body
	rootElement = document.createElement('main')
	body.insertBefore(rootElement, body.firstChild)
}
const renderLoading = () => <Loader color="#26A65B" />
const onError = err => console.error(err) // eslint-disable-line no-console
let render = () => {
	const routes = require('../route').default
	const router = (
		<Router key={Math.random()} routes={routes} history={history}
			render={props => <AsyncProps {...props} onError={onError} renderLoading={renderLoading} />} />
	)
	ReactDOM.render(router, rootElement)
}

if (module.hot) {
	const renderApp = render
	const renderError = err => {
		const RedBox = require('redbox-react')
		ReactDOM.render(<RedBox error={err} />, rootElement)
	}
	render = () => {
		try {
			renderApp()
		} catch (err) {
			renderError(err)
		}
	}
	module.hot.accept('../route', render)
}

render()

global.React = React
