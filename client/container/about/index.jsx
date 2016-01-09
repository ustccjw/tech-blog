import React from 'react'
import About from '../../component/about'
import { loadProps } from '../../action/about'

export default class AboutContainer extends React.Component {
	static propTypes = {
		resume: React.PropTypes.string,
	};

	static loadProps = loadProps;

	render() {
		const { resume } = this.props
		const props = { resume }
		return <About {...props} />
	}
}
