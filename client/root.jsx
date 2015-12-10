import React from 'react'
import { Router } from 'react-router'
import { createHistory } from 'history'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import AsyncProps from 'async-props'
import routes from './route'

const history = useScroll(createHistory)()
const loading = <div>Loading...</div>

export default class Root extends React.Component {
	render() {
		return (
			<Router routes={ routes } history={ history }
				RoutingContext={ AsyncProps }
				renderLoading={ () => loading } />
		)
	}
}
