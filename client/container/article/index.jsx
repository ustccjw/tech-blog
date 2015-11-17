import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'
import Article from '../../component/article'

@connect(state => ({
	number: +state.router.params.number,
	articleState: state.article.toJS(),
	articleByNumber: state.entities.articleByNumber || null,
}))
export default class ArticleContainer extends React.Component {
	static propTypes = {
		number: React.PropTypes.number,
		articleState: React.PropTypes.object,
		articleByNumber: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	}

	componentWillMount() {
		const { dispatch, number } = this.props
		dispatch(retrievePath(['articleByNumber', number, 'content']))
	}

	render() {
		const { articleByNumber, number } = this.props
		const props = {
			article: articleByNumber && articleByNumber[number],
			dispatch: this.dispatch,
		}
		return <Article { ...props } />
	}
}
