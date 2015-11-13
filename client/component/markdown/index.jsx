import React from 'react'
import Remarkable from 'react-remarkable'
import './style'

export default class Markdown extends React.Component {
	static propTypes = {
		content: React.PropTypes.string,
	}

	render() {
		const { content } = this.props
		return (
			<ideal-markdown>
				<Remarkable source={ content } />
			</ideal-markdown>
		)
	}
}
