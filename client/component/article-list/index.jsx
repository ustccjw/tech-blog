import React from 'react'
import Card from '../card'
import './style'

export default class ArticleList extends React.Component {
	static propTypes = {
		articles: React.PropTypes.array,
	}

	render() {
		const { articles } = this.props
		let articleComponents = null
		if (articles) {
			articleComponents = articles.map(article =>
				<Card key={article.number} article={ article } />
			)
		}
		return (
			<ideal-articlelist>
				{ articleComponents }
			</ideal-articlelist>
		)
	}
}
