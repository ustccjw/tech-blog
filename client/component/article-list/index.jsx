import React from 'react'
import Card from '../card'
import Pager from '../pager'
import { uiModel } from '../../../model'
import './style'

export default class ArticleList extends React.Component {
	static propTypes = {
		page: React.PropTypes.number.isRequired,
		articles: React.PropTypes.array.isRequired,
		totalPages: React.PropTypes.number.isRequired,
	}

	static contextTypes = {
		reload: React.PropTypes.func.isRequired,
	}

	render() {
		const { articles, page, totalPages } = this.props
		const articleComponents = articles.map(article =>
			<Card key={article.number} article={ article } />
		)
		const handleChange = async type => {
			if ('prev' === type) {
				await uiModel.setValue(['articleList', 'page'], page - 1)
				this.context.reload()
			} else if ('next' === type) {
				await uiModel.setValue(['articleList', 'page'], page + 1)
				this.context.reload()
			}
		}
		const props = {
			handleChange,
			canPrev: page > 1,
			canNext: page < totalPages,
		}
		return (
			<ideal-articlelist>
				{ articleComponents }
				<Pager { ...props } />
			</ideal-articlelist>
		)
	}
}
