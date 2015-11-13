import React from 'react'
import Card from '../card'
import './style'

export default class ArticleList extends React.Component {
	static propTypes = {
		articleList: React.PropTypes.object,
		articles: React.PropTypes.array,
		dispatch: React.PropTypes.func,
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
