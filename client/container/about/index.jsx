import React from 'react'
import About from '../../component/about'
import { dataModel } from '../../../model'

export default class AboutContainer extends React.Component {
	static propTypes = {
		resume: React.PropTypes.string,
	}

	static async loadProps(params) {
		const resume = await dataModel.getValue(['resume'])
		return { resume }
	}

	render() {
		const { resume } = this.props
		const props = { resume }
		return <About { ...props } />
	}
}
