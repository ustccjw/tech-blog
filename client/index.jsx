import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import AsyncProps from 'async-props'
import routes from '../route'

global.React = React

// onError: loadProps error
const router = (
	<Router routes={routes} history={browserHistory} render={props =>
		<AsyncProps {...props} onError={err => console.error(err)} />} />
)

ReactDOM.render(router, document.querySelector('.react-root'))
