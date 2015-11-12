import React from 'react'
import './style'
import Header from '../../component/header'

export default class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.any,
	}

	render() {
		const { children } = this.props
		const props = {
			title: 'My name is Jiawei Chen, this blog is for Exploring and Practicing, especially for React.',
			links: [{
				label: 'POSTS',
				value: '/articles/',
			}, {
				label: 'GITHUB',
				value: 'https://github.com/ustccjw',
			}, {
				label: 'ABOUT',
				value: '/about/',
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
