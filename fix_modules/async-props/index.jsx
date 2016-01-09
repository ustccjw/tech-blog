import React from 'react'
import RoutingContext from 'react-router/lib/RoutingContext'

const { array, func, object } = React.PropTypes

function eachComponents(components, iterator) {
	components.forEach(value => {
		if (typeof value === 'object') {
			for (const Component of value) {
				iterator(Component)
			}
		} else {
			iterator(value)
		}
	})
}

function filterAndFlattenComponents(components) {
	const flattened = []
	eachComponents(components, Component => {
		if (Component.loadProps) {
			flattened.push(Component)
		}
	})
	return flattened
}

async function loadAsyncProps(components, params) {

	// flatten the multi-component routes
	const componentsArray = []
	const propsArray = []
	const tasks = components.map((Component, index) => {
		return Component.loadProps(params).then(props => {
			propsArray[index] = props
			componentsArray[index] = Component
		})
	})
	await Promise.all(tasks)
	return { componentsArray, propsArray }
}

function lookupPropsForComponent(Component, propsAndComponents) {
	const { componentsArray, propsArray } = propsAndComponents
	const index = componentsArray.indexOf(Component)
	return propsArray[index]
}

function mergePropsAndComponents(current, changes) {
	for (let i = 0, l = changes.propsArray.length; i < l; i++) {
		const Component = changes.componentsArray[i]
		const position = current.componentsArray.indexOf(Component)
		const isNew = position === -1

		if (isNew) {
			current.propsArray.push(changes.propsArray[i])
			current.componentsArray.push(changes.componentsArray[i])
		} else {
			current.propsArray[position] = changes.propsArray[i]
		}
	}
	return current
}

function arrayDiff(previous, next) {
	const diff = []
	for (const value of next) {
		if (previous.indexOf(value) === -1) {
			diff.push(value)
		}
	}
	return diff
}

function shallowEqual(a, b) {
	let same = 0
	let count = 0
	Object.keys(a).forEach(key => {
		if (a[key] === b[key]) {
			same++
		}
		count++
	})

	return same === count === Object.keys(b).length
}

function createElement(Component, props) {
	if (Component.loadProps) {
		return <AsyncPropsContainer Component={Component}
			routerProps={props} />
	} else {
		return <Component {...props} />
	}
}

export function loadPropsOnServer({ components, params }) {
	return loadAsyncProps(filterAndFlattenComponents(components), params)
}

class AsyncPropsContainer extends React.Component {
	static propTypes = {
		Component: func.isRequired,
		routerProps: object.isRequired,
	};

	static contextTypes = {
		asyncProps: object.isRequired,
	};

	render() {
		const { Component, routerProps } = this.props
		const { propsAndComponents, loading, reload } = this.context.asyncProps
		const asyncProps = lookupPropsForComponent(Component,
			propsAndComponents)
		return (
			<Component {...routerProps} {...asyncProps} reload={reload}
				loading={loading} />
		)
	}
}

class AsyncProps extends React.Component {
	static childContextTypes = {
		asyncProps: object,
	};

	static propTypes = {
		components: array.isRequired,
		params: object.isRequired,
		location: object.isRequired,
		onError: func.isRequired,
		renderLoading: func.isRequired,

		// server rendering
		propsArray: array,
		componentsArray: array,
	};

	static defaultProps = {
		onError: err => { throw err },
		renderLoading: () => null,
	};

	constructor(props, context) {
		super(props, context)
		const { propsArray, componentsArray } = this.props
		const isServerRender = propsArray && componentsArray
		this.state = {
			loading: false,
			prevProps: null,
			propsAndComponents: isServerRender ?
				{ propsArray, componentsArray } : null,
		}
	}

	getChildContext() {
		const { loading, propsAndComponents } = this.state
		return {
			asyncProps: {
				loading,
				propsAndComponents,
				reload: ::this.reload,
			},
		}
	}

	componentDidMount() {
		const { components, params, location } = this.props
		this.loadAsyncProps(components, params, location)
	}

	componentWillReceiveProps(nextProps) {
		const routeChanged = nextProps.location !== this.props.location
		if (!routeChanged) {
			return
		}
		const oldComponents = filterAndFlattenComponents(this.props.components)
		const newComponents = filterAndFlattenComponents(nextProps.components)
		let components = []
		const paramsChanged = !shallowEqual(nextProps.params,
			this.props.params)
		if (paramsChanged) {
			components = newComponents
		} else {
			components = arrayDiff(oldComponents, newComponents)
		}
		if (components.length > 0) {
			this.loadAsyncProps(components, nextProps.params,
				nextProps.location)
		}
	}

	componentWillUnmount() {
		this._unmounted = true
	}

	async loadAsyncProps(components, params, location, options) {
		this.setState({
			loading: true,
			prevProps: this.props,
		})
		const { onError } = this.props
		let propsAndComponents = null
		try {
			propsAndComponents = await loadAsyncProps(filterAndFlattenComponents(components), params)
		} catch (err) {
			this.setState({ loading: false })
			onError(err)
			return
		}
		const force = options && options.force
		const sameLocation = this.props.location === location
		if ((force || sameLocation) && !this._unmounted) {
			if (this.state.propsAndComponents) {
				propsAndComponents = mergePropsAndComponents(
					this.state.propsAndComponents, propsAndComponents)
			}
			this.setState({
				loading: false,
				propsAndComponents,
				prevProps: null,
			})
		}
	}

	reload() {
		const { components, params, location } = this.props
		return this.loadAsyncProps(components, params, location,
			{ force: true })
	}

	render() {
		const { propsAndComponents, loading, prevProps } = this.state
		const { renderLoading } = this.props
		if (!propsAndComponents) {
			return renderLoading()
		} else {
			const props = prevProps || this.props
			return <RoutingContext {...props} createElement={createElement} />
		}
	}
}

export default AsyncProps
