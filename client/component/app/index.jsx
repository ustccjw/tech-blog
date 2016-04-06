import React from 'react'
import Header from '../header'

import './style'

const App = props => {
	const { children } = props
	const headProps = {
		title: 'My name is Jiawei Chen, this blog is for Exploring and Practicing, especially for React.',
		links: [{
			label: 'POSTS',
			value: '/articles/',
		}, {
			label: 'ABOUT',
			value: '/about/',
		}, {
			label: 'GITHUB',
			value: 'https://github.com/ustccjw',
		}, {
			label: 'SOURCE',
			value: 'https://github.com/ustccjw/tech-blog',
		}],
	}
	return (
		<ideal-app>
			<Header {...headProps} />
			<article>
				{children}
			</article>
		</ideal-app>
	)
}

App.propTypes = {
	children: React.PropTypes.any,
}

export default App
