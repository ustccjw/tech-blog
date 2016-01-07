import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createHistory } from 'history'
import AsyncProps from 'async-props'
import routes from '../route'

global.React = React

const history = createHistory()

// onError: loadProps error
const router = (
	<Router routes={routes} history={history} RoutingContext={AsyncProps}
		onError={err => console.error(err)} />
)

ReactDOM.render(router, document.querySelector('.react-root'))
