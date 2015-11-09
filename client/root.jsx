import React from 'react'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import * as reducers from './reducer'
import * as routes from './route'
import App from './container/app'

const reducer = combineReducers(reducers)
const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
const store = finalCreateStore(reducer)

const rootRoute = {
	childRoutes: Object.keys(routes).map(key => routes[key]),
	component: App,
}

export default class Root {
	static propTypes = {
		history: React.PropTypes.object,
	}

	render() {
		return (
			<Provider store={store}>
				<Router routes={rootRoute} history={this.props.history} />
			</Provider>
		)
	}
}
