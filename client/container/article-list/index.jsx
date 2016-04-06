import React from 'react'
import ArticleList from '../../component/article-list'
import { object2Array } from '../../../util'

import { loadProps } from '../../action/article-list'

const ArticleListContainer = props => {
	const { page, articles, totalPages } = props
	const articleListProps = {
		page,
		totalPages,
		articles: object2Array(articles),
	}
	return <ArticleList {...articleListProps} />
}

ArticleListContainer.propTypes = {
	page: React.PropTypes.number.isRequired,
	articles: React.PropTypes.object.isRequired,
	totalPages: React.PropTypes.number.isRequired,
}

ArticleListContainer.loadProps = loadProps

export default ArticleListContainer
