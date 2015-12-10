import React from 'react'
import About from '../../component/about'
import { DataModel } from '../../model'

export default class AboutContainer extends React.Component {
	static propTypes = {
		resume: React.PropTypes.string,
	}

	static async loadProps(params, cb) {
		try {
			const resume = await DataModel.getValue(['resume'])
			cb(null, { resume })
		} catch (err) {
			console.error(err)
			cb(err)
		}
	}

	static childContextTypes = {
		reload: React.PropTypes.func
	}

	getChildContext() {
		const { reloadAsyncProps } = this.props
		return {
			reload: () => reloadAsyncProps()
		}
	}

	render() {
		const { resume } = this.props
		const props = { resume }
		return <About { ...props } />
	}
}
