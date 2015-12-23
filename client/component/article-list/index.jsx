import React from 'react'
import Card from '../card'
import Pager from '../pager'
import { jumpPage } from '../../action/article-list'
import './style'

export default class ArticleList extends React.Component {
	render() {
		const { articles, page, totalPages } = this.props
		const articleComponents = articles.map(article =>
			<Card key={article.number} article={article} />
		)
		const handleChange = async type => {
			if ('prev' === type) {
				jumpPage(page - 1)
			} else if ('next' === type) {
				jumpPage(page + 1)
			}
		}
		const props = {
			handleChange,
			canPrev: page > 1,
			canNext: page < totalPages,
		}
		return (
			<ideal-articlelist>
				{articleComponents}
				<Pager {...props} />
			</ideal-articlelist>
		)
	}
}
