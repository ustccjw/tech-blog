import React from 'react'
import { Link } from 'react-router'
import './style'

export default class Header extends React.Component {
	static propTypes = {
		title: React.PropTypes.string.isRequired,
		links: React.PropTypes.array.isRequired,
	}

	render() {
		const { title, links } = this.props
		const linksComponent = links.map(({label, value}) => {
			let link = <Link to={ value }>{ label }</Link>
			if (value.startsWith('http')) {
				link = <a href={ value } target='_blank'>{ label }</a>
			}
			return <li key={ label }>{ link }</li>
		})
		return (
			<ideal-header>
				<header>
					<h1>{ title }</h1>
					<nav>
						<ul>{ linksComponent }</ul>
					</nav>
				</header>
			</ideal-header>
		)
	}
}
