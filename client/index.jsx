import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createHistory } from 'history'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import AsyncProps from 'async-props'
import routes from './route'

window.React = React

const history = useScroll(createHistory)()
const loading = <div>Loading...</div>

const router = (
	<Router routes={ routes } history={ history }
		RoutingContext={ AsyncProps } renderLoading={ () => loading } />
)

ReactDOM.render(router, document.querySelector('.react-root'))
