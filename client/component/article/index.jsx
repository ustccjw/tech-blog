import React from 'react'
import './style'
import Markdown from 'react-remarkable'

export default class Article extends React.Component {
	static propTypes = {
		article: React.PropTypes.object,
	}

	render() {
		const { article } = this.props
		return (
			<ideal-article>
				{ article ? <Markdown source={ article.content } /> : null }
			</ideal-article>
		)
	}
}
