import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'
import Article from '../../component/article'

@connect(state => ({
	number: state.router.params.number,
	article: state.article,
	articles: state.entities.articles || null,
}))
export default class ArticleContainer extends React.Component {
	static propTypes = {
		article: React.PropTypes.object,
		articles: React.PropTypes.array,
		dispatch: React.PropTypes.func,
	}

	componentWillMount() {
		const { dispatch } = this.props
		dispatch(retrievePath('articles'))
	}

	render() {
		const { articles, number } = this.props
		let article = null
		if (articles) {
			articles.every(obj => {
				if (+obj.number === +number) {
					article = obj
					return false
				}
				return true
			})
		}
		const props = {
			article,
			dispatch: this.dispatch,
		}
		return <Article { ...props } />
	}
}
