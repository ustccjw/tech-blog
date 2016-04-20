import React from 'react'
import Card from '../card'
import Pager from '../pager'

import './style'

import { jumpPage } from '../../action/article-list'

const ArticleList = props => {
	const { articles, page, totalPages } = props
	const articleComponents = articles.map(article =>
		<Card key={article.number} article={article} />
	)
	const handleChange = async type => {
		if (type === 'prev') {
			jumpPage(page - 1)
		} else if (type === 'next') {
			jumpPage(page + 1)
		}
	}
	const pageProps = {
		handleChange,
		canPrev: page > 1,
		canNext: page < totalPages,
	}
	return (
		<ideal-articlelist>
			{articleComponents}
			<Pager {...pageProps} />
		</ideal-articlelist>
	)
}

ArticleList.propTypes = {
	articles: React.PropTypes.array.isRequired,
	page: React.PropTypes.number.isRequired,
	totalPages: React.PropTypes.number.isRequired,
}

export default ArticleList
