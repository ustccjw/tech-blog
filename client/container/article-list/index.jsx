import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'
import ArticleList from '../../component/article-list'
import { object2Array } from '../../../util'
import { PAGE_SIZE } from '../../constant/config'

@connect(state => ({
	articleListState: state.articleList.toJS(),
	articles: state.entities.articles || null,
}))
export default class ArticleListContainer extends React.Component {
	static propTypes = {
		articleListState: React.PropTypes.object,
		articles: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	}

	componentWillMount() {
		const { dispatch, articleListState } = this.props
		const { page } = articleListState
		const from = (page - 1) * PAGE_SIZE
		const to = from + PAGE_SIZE
		dispatch(retrievePath(['articles', { from, to },
			['number', 'content']]))
	}

	render() {
		const { articleListState, articles } = this.props
		const { page } = articleListState
		const from = (page - 1) * PAGE_SIZE
		const to = from + PAGE_SIZE
		const props = {
			articleListState,
			articles: articles && object2Array(articles).reverse().
				slice(from, to),
		}
		return <ArticleList { ...props } />
	}
}
