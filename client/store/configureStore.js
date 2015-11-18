import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { createFalcorMiddleware, falcorReducer } from 'redux-falcor'
import falcor from 'falcor'
import { reduxReactRouter, routerStateReducer } from 'redux-router'
import { createHistory } from 'history'
import promiseMiddleware from 'redux-promise'
import { warningMiddleware } from '../middleware'
import * as reducers from '../reducer'
import routes from '../route'

const reducer = combineReducers({
	...reducers,
	entities: falcorReducer,
	router: routerStateReducer,
})
const model = new falcor.Model({
	source: new falcor.HttpDataSource('/model.json'),
})

let finalCreateStore = null
if (process.env.NODE_ENV === 'development') {
	const devTool = require('../dev-tool')
	const { persistState } = require('redux-devtools')
	finalCreateStore = compose(
		applyMiddleware(promiseMiddleware, createFalcorMiddleware(model),
			warningMiddleware),
		reduxReactRouter({
			routes,
			createHistory,
		}),
		devTool.instrument(),
		persistState(window.location.href.match(
			/[?&]debug_session=([^&]+)\b/)),
	)(createStore)
} else {
	finalCreateStore = compose(
		applyMiddleware(promiseMiddleware, createFalcorMiddleware(model)),
		reduxReactRouter({
			routes,
			createHistory,
		}),
	)(createStore)
}

export default function configureStore(initialState) {
	const store = finalCreateStore(reducer, initialState)
	if (module.hot) {
		module.hot.accept('../reducer', () =>
			store.replaceReducer(require('../reducer'))
		)
	}
	return store
}
