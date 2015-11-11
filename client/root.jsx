import React from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import configureStore from './store/configureStore'

const store = configureStore()

export default class Root extends React.Component {
	render() {
		let devTool = null
		if (process.env.NODE_ENV === 'development') {
			const DevTools = require('./dev-tool')
			devTool = <DevTools />
		}
		return (
			<Provider store={ store }>
				<div>
					<ReduxRouter />
					{ devTool }
				</div>
			</Provider>
		)
	}
}
