import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'

import ArticleList from '../../component/article-list'

@connect(state => ({
	articleList: state.articleList,
	articles: state.entities.articles || null,
}))
export default class ArticleListContainer extends React.Component {
	static propTypes = {
		articleList: React.PropTypes.object,
		articles: React.PropTypes.array,
		dispatch: React.PropTypes.func,
	}

	componentWillMount() {
		const { dispatch, articles } = this.props
		dispatch(retrievePath('articles'))
	}

	render() {
		return <ArticleList { ...this.props } />
	}
}
