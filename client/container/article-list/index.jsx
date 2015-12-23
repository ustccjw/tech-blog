import React from 'react'
import ArticleList from '../../component/article-list'
import { loadProps } from '../../action/article-list'
import { object2Array } from '../../../util'

export default class ArticleListContainer extends React.Component {
	static propTypes = {
		page: React.PropTypes.number.isRequired,
		articles: React.PropTypes.object.isRequired,
		totalPages: React.PropTypes.number.isRequired,
	}

	static loadProps = loadProps

	render() {
		const { page, articles, totalPages } = this.props
		const props = {
			page,
			totalPages,
			articles: object2Array(articles),
		}
		return <ArticleList {...props} />
	}
}
