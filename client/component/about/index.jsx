import React from 'react'
import Markdown from '../markdown'

import './style'

const About = props => {
	const { resume } = props
	return (
		<ideal-about>
			{resume && <Markdown content={resume} />}
		</ideal-about>
	)
}

About.propTypes = {
	resume: React.PropTypes.string.isRequired,
}

export default About
