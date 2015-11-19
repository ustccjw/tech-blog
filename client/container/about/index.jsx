import React from 'react'
import { connect } from 'react-redux'
import { retrievePath } from 'redux-falcor'
import About from '../../component/about'

@connect(state => ({
	resume: state.entities.resume || null,
}))
export default class AboutContainer extends React.Component {
	static propTypes = {
		resume: React.PropTypes.string,
		dispatch: React.PropTypes.func,
	}

	componentWillMount() {
		const { dispatch } = this.props
		dispatch(retrievePath('resume'))
	}

	render() {
		const { resume } = this.props
		const props = { resume }
		return props.resume ? <About { ...props } /> : null
	}
}
