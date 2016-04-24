import React from 'react'
import RouterContext from 'react-router/lib/RouterContext'

function eachComponents(components, iterator) {
	components.forEach(value => {
		if (typeof value === 'object') {
			for (const component of value) {
				iterator(component)
			}
		} else {
			iterator(value)
		}
	})
}

function findAsyncComponents(components) {
	const asyncComponents = []
	eachComponents(components, component => {
		if (component.loadProps) {
			asyncComponents.push(component)
		}
	})
	return asyncComponents
}

async function loadAsyncProps(components, params, location) {
	const componentsArray = []
	const propsArray = []
	const tasks = findAsyncComponents(components).map((component, index) =>
		component.loadProps(params, location).then(props => {
			propsArray[index] = props
			componentsArray[index] = component
		})
	)
	await Promise.all(tasks)
	return { componentsArray, propsArray }
}

function lookupPropsForComponent(component, propsAndComponents) {
	const { componentsArray, propsArray } = propsAndComponents
	const index = componentsArray.indexOf(component)
	return propsArray[index]
}

function createElement(Component, props, asyncInfo) {
	if (Component.loadProps) {
		return <AsyncPropsContainer Component={Component} routerProps={props} asyncInfo={asyncInfo} />
	}
	return <Component {...props} />
}

const AsyncPropsContainer = ({ Component, routerProps, asyncInfo,
	...otherProps }) => {
	const { propsAndComponents, loading, reload } = asyncInfo
	const asyncProps = lookupPropsForComponent(Component, propsAndComponents)
	return (
		<Component {...routerProps} {...asyncProps} {...otherProps} reload={reload}
			loading={loading} />
	)
}

class AsyncProps extends React.Component {
	static propTypes = {
		components: React.PropTypes.array.isRequired,
		params: React.PropTypes.object.isRequired,
		location: React.PropTypes.object.isRequired,
		onError: React.PropTypes.func.isRequired,
		renderLoading: React.PropTypes.func.isRequired,

		// server rendering
		propsArray: React.PropTypes.array,
		componentsArray: React.PropTypes.array,
	}

	static defaultProps = {
		onError: err => { throw err },
		renderLoading: () => null,
	}

	constructor(props, context) {
		super(props, context)
		const { propsArray, componentsArray } = props
		const isServerRender = propsArray && componentsArray
		this.state = {
			loading: false,
			prevProps: null,
			propsAndComponents: isServerRender ? { propsArray, componentsArray } :
				null,
		}
	}

	componentDidMount() {
		const { components, params, location } = this.props
		this.loadAsyncProps(components, params, location)
	}

	componentWillReceiveProps(nextProps) {
		const routeChanged = nextProps.location !== this.props.location
		if (routeChanged) {
			const { components, params, location } = nextProps
			this.loadAsyncProps(components, params, location)
		}
	}

	componentWillUnmount() {
		this.unmounted = true
	}

	async loadAsyncProps(components, params, location) {
		this.setState({ loading: true, prevProps: this.props })
		const { onError } = this.props
		let propsAndComponents = null
		try {
			propsAndComponents = await loadAsyncProps(components, params, location)
		} catch (err) {
			this.setState({ loading: false })
			onError(err)
			return
		}
		const sameLocation = this.props.location === location
		if (sameLocation && !this.unmounted) {
			this.setState({ loading: false, prevProps: null, propsAndComponents })
		}
	}

	reload(actionName, ...args) {
		if (process.env.NODE_ENV === 'development') {
			console.info(actionName, args) // eslint-disable-line no-console
		}
		const { components, params, location } = this.props
		return this.loadAsyncProps(components, params, location)
	}

	render() {
		const { loading, prevProps, propsAndComponents } = this.state
		const { renderLoading } = this.props
		if (!propsAndComponents) {
			return renderLoading()
		}
		const asyncInfo = { loading, propsAndComponents, reload: ::this.reload }
		const props = prevProps || this.props
		return (
			<RouterContext {...props} createElement={(components, props1) =>
				createElement(components, props1, asyncInfo)} />
		)
	}
}

export const loadPropsOnServer = ({ components, params, location }) =>
	loadAsyncProps(components, params, location)

export default AsyncProps
