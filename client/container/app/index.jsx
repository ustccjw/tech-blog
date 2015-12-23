import React from 'react'
import App from '../../component/app'
import Loading from '../../component/loading'
import './style'

export default class AppContainer extends React.Component {
	static propTypes = {
		children: React.PropTypes.any,
	}

	static contextTypes = {
		asyncProps: React.PropTypes.object.isRequired,
	}

	componentWillMount() {
		const { reload } = this.context.asyncProps
		global.reload = reload
	}

	render() {
		const { children } = this.props
		const { loading } = this.context.asyncProps
		const props = { children, loading }
		return (
			<div>
				<App { ...props } />
				{ loading ? <Loading /> : null }
			</div>
		)
	}
}
