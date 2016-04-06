import React from 'react'
import About from '../../component/about'

import { loadProps } from '../../action/about'

const AboutContainer = props => {
	const { resume } = props
	const aboutProps = { resume }
	return <About {...aboutProps} />
}

AboutContainer.propTypes = {
	resume: React.PropTypes.string,
}

AboutContainer.loadProps = loadProps

export default AboutContainer
