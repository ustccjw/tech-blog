import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createHistory } from 'history'
import AsyncProps from 'async-props'
import routes from '../route'

global.React = React

const history = createHistory()

const router = (
	<Router routes={routes} history={history} RoutingContext={AsyncProps} />
)

ReactDOM.render(router, document.querySelector('.react-root'))
