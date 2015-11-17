import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'
import ArticleList from '../../component/article-list'
import { object2Array } from '../../../util'

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
		const from = (page - 1) * 15
		const to = from + 15
		dispatch(retrievePath(['articles', { from, to },
			['number', 'content']]))
	}

	render() {
		const { articleListState, articles, dispatch } = this.props
		const { page } = articleListState
		const from = (page - 1) * 15
		const to = from + 15
		const props = {
			articleListState,
			dispatch,
			articles: articles && object2Array(articles).reverse().
				slice(from, to),
		}
		return <ArticleList { ...props } />
	}
}
