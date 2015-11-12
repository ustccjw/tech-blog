import React from 'react'
import './style'
import Markdown from 'react-remarkable'

export default class Card extends React.Component {
	static propTypes = {
		article: React.PropTypes.object,
	}

	render() {
		const { article } = this.props
		return (
			<ideal-card>
				<Markdown source={ article.content } />
			</ideal-card>
		)
	}
}
