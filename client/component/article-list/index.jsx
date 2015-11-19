import React from 'react'
import Card from '../card'
import Pager from '../pager'
import { setPage } from '../../action/acticle-list'
import './style'

export default class ArticleList extends React.Component {
	static propTypes = {
		page: React.PropTypes.number.isRequired,
		articles: React.PropTypes.array.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	}

	render() {
		const { articles, page, dispatch } = this.props
		const articleComponents = articles.map(article =>
			<Card key={article.number} article={ article } />
		)
		const handleChange = type => {
			if ('prev' === type) {
				if (page > 1) {
					dispatch(setPage(page - 1))
				}
			} else if ('next' === type) {
				dispatch(setPage(page + 1))
			}
		}
		return (
			<ideal-articlelist>
				{ articleComponents }
				<Pager handleChange={ handleChange } />
			</ideal-articlelist>
		)
	}
}
