import React from 'react'
import './style'
import { Link } from 'react-router'
import Markdown from 'react-remarkable'

export default class Card extends React.Component {
	static propTypes = {
		article: React.PropTypes.object,
	}

	render() {
		const { article } = this.props
		return (
			<ideal-card>
				<Markdown source={ article.content } />
				<Link to={ `/articles/${article.number}/` }>View More</Link>
			</ideal-card>
		)
	}
}
