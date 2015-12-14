import React from 'react'
import Header from '../header'
import './style'

export default class App extends React.Component {
	static propTypes = {
		loading: React.PropTypes.bool.isRequired,
		children: React.PropTypes.any,
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { loading } = nextProps
		return !loading
	}

	render() {
		const { children } = this.props
		const props = {
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
				<Header {...props} />
				<article>
					{ children }
				</article>
			</ideal-app>
		)
	}
}
