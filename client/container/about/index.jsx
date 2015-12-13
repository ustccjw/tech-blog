import React from 'react'
import About from '../../component/about'
import { dataModel } from '../../../model'

export default class AboutContainer extends React.Component {
	static propTypes = {
		resume: React.PropTypes.string,
	}

	static async loadProps(params, cb) {
		try {
			const resume = await dataModel.getValue(['resume'])
			cb(null, { resume })
		} catch (err) {
			console.error(err)
			cb(err)
		}
	}

	render() {
		const { resume } = this.props
		const props = { resume }
		return <About { ...props } />
	}
}
