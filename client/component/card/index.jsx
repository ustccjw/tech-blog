import React from 'react'
import { Link } from 'react-router'
import Markdown from '../markdown'
import './style'

export default class Card extends React.Component {
	static propTypes = {
		article: React.PropTypes.object,
	}

	render() {
		const { article } = this.props
		return (
			<ideal-card>
				<Markdown content={ article.content } />
				<Link to={ `/articles/${article.number}/` }>View More</Link>
			</ideal-card>
		)
	}
}
