import React from 'react'
import ArticleList from '../../component/article-list'
import { dataModel, uiModel } from '../../../model'
import { object2Array } from '../../../util'
import { PAGE_SIZE } from '../../config'

export default class ArticleListContainer extends React.Component {
	static propTypes = {
		page: React.PropTypes.number.isRequired,
		articles: React.PropTypes.object.isRequired,
		totalPages: React.PropTypes.number.isRequired,
	}

	static async loadProps(params) {
		const page = await uiModel.getValue(['articleList', 'page'])
		const from = (page - 1) * PAGE_SIZE
		const to = from + PAGE_SIZE - 1
		const response = await dataModel.get(['articles',
			{ from, to }, ['number', 'introduction']], ['articles', 'length'])
		const { articles } = response.json
		const length = articles.length
		delete articles.length
		const totalPages = Math.ceil(length / PAGE_SIZE)
		return { articles, page, totalPages }
	}

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
