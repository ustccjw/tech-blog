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

	static async loadProps(params, cb) {
		try {
			const page = await uiModel.getValue(['articleList', 'page'])
			const from = (page - 1) * PAGE_SIZE
			const to = from + PAGE_SIZE - 1
			const response = await dataModel.get(['articles',
				{ from, to }, ['number', 'content']], ['articles', 'length'])
			const { articles } = response.json
			const length = articles.length
			delete articles.length
			const totalPages = Math.ceil(length / PAGE_SIZE)
			cb(null, { articles, page, totalPages })
		} catch (err) {
			console.error(err)
			cb(err)
		}
	}

	static childContextTypes = {
		reload: React.PropTypes.func,
	}

	getChildContext() {
		const { reloadAsyncProps } = this.props
		return {
			reload: () => reloadAsyncProps(),
		}
	}

	render() {
		const { page, articles, totalPages } = this.props
		const props = {
			page,
			totalPages,
			articles: object2Array(articles),
		}
		return <ArticleList { ...props } />
	}
}
