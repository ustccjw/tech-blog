import React from 'react'
import './style'

export default class Header extends React.Component {
	static propTypes = {
		title: React.PropTypes.string,
		children: React.PropTypes.any,
	}

	render() {
		const { title, children } = this.props
		return (
			<header className="header">
				<h1>{ title }</h1>
				{ children }
			</header>
		)
	}
}
