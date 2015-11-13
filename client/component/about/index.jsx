import React from 'react'
import Markdown from '../markdown'
import './style'

export default class About extends React.Component {
	static propTypes = {
		resume: React.PropTypes.string,
	}

	render() {
		const { resume } = this.props
		return (
			<ideal-about>
				{ resume ? <Markdown content={ resume } /> : null }
			</ideal-about>
		)
	}
}
