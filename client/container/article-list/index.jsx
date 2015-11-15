import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'
import ArticleList from '../../component/article-list'
import { object2Array } from '../../../util'

@connect(state => ({
	articleList: state.articleList,
	articles: state.entities.articles || null,
}))
export default class ArticleListContainer extends React.Component {
	static propTypes = {
		articleList: React.PropTypes.object,
		articles: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	}

	componentWillMount() {
		const { dispatch, articleList } = this.props
		const { page } = articleList.toJS()
		const from = (page - 1) * 15
		const to = from + 15
		dispatch(retrievePath(['articles', { from, to }]))
	}

	render() {
		const { articleList, articles, dispatch } = this.props
		const { page } = articleList.toJS()
		const from = (page - 1) * 15
		const to = from + 15
		const props = {
			articleList,
			dispatch,
			articles: articles && object2Array(articles).slice(from, to),
		}
		return <ArticleList { ...props } />
	}
}
