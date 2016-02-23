import React from 'react'
import Markdown from '../markdown'
import './style'

export default class Article extends React.Component {
	static propTypes = {
		article: React.PropTypes.object.isRequired,
	}

	render() {
		const { article } = this.props
		return (
			<ideal-article>
				{article ? <Markdown content={article.content} /> : null}
			</ideal-article>
		)
	}
}
