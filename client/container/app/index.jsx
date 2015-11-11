import React from 'react'
import './style'
import Header from '../../component/header'

export default class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.any,
	}

	render() {
		const { children } = this.props
		return (
			<div className="app">
				<Header title="技术驱动博客" />
				<div className="body">
					{ children }
				</div>
			</div>
		)
	}
}
