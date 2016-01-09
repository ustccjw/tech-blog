import React from 'react'
import Article from '../../component/article'
import { loadProps } from '../../action/article'

export default class ArticleContainer extends React.Component {
	static propTypes = {
		params: React.PropTypes.object,
		article: React.PropTypes.object,
	};

	static loadProps = loadProps;

	render() {
		const { article } = this.props
		const props = { article }
		return <Article {...props} />
	}
}
