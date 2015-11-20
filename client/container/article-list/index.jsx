import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'
import ArticleList from '../../component/article-list'
import { object2Array } from '../../../util'
import { PAGE_SIZE } from '../../constant/config'

@connect(state => ({
	state: state.articleList.toJS(),
	articles: state.entities.articles || null,
}))
export default class ArticleListContainer extends React.Component {
	static propTypes = {
		state: React.PropTypes.object,
		articles: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	}

	componentWillMount() {
		const { dispatch, state } = this.props
		const { page } = state
		const from = (page - 1) * PAGE_SIZE
		const to = from + PAGE_SIZE - 1
		dispatch(retrievePath(['articles', { from, to },
			['number', 'content']]))
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.state.page !== nextProps.state.page) {
			const { dispatch, state } = nextProps
			const { page } = state
			const from = (page - 1) * PAGE_SIZE
			const to = from + PAGE_SIZE - 1
			dispatch(retrievePath(['articles', { from, to },
				['number', 'content']]))
		}
	}

	render() {
		const { state, articles, dispatch } = this.props
		const { page } = state
		const from = (page - 1) * PAGE_SIZE
		const to = from + PAGE_SIZE - 1
		const props = {
			...state,
			dispatch,
			articles: articles && object2Array(articles).slice(from, to + 1),
		}
		return props.articles && props.articles.length ?
			<ArticleList { ...props } /> : null
	}
}
