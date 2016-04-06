import React from 'react'
import { Link } from 'react-router'

import './style'

const Header = props => {
	const { title, links } = props
	const linksComponent = links.map(({ label, value }) => {
		let link = <Link to={value}>{label}</Link>
		if (value.startsWith('http')) {
			link = <a href={value} target='_blank'>{label}</a>
		}
		return <li key={label}>{link}</li>
	})
	return (
		<ideal-header>
			<header>
				<h1>{title}</h1>
				<nav>
					<ul>{linksComponent}</ul>
				</nav>
			</header>
		</ideal-header>
	)
}

Header.propTypes = {
	title: React.PropTypes.string.isRequired,
	links: React.PropTypes.array.isRequired,
}

export default Header
