import React from 'react'
import Markdown from 'react-remarkable'
import './style'

export default class About extends React.Component {
	static propTypes = {
		resume: React.PropTypes.string,
	}

	render() {
		const { resume } = this.props
		return (
			<ideal-about>
				{ resume ? <Markdown source={ resume } /> : null }
			</ideal-about>
		)
	}
}
