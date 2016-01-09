import React from 'react'
import App from '../../component/app'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './style'

export default class AppContainer extends React.Component {
	static propTypes = {
		children: React.PropTypes.any,
		loading: React.PropTypes.bool.isRequired,
		reload: React.PropTypes.func.isRequired,
	};

	static contextTypes = {
		asyncProps: React.PropTypes.object.isRequired,
	};

	static loadProps = async () => {};

	componentWillMount() {
		const { reload } = this.props
		global.reload = reload
	}

	shouldComponentUpdate(nextProps) {
		const { loading } = nextProps
		if (loading) {
			NProgress.start()
			return false
		} else {
			NProgress.done()
			return true
		}
	}

	render() {
		const { children } = this.props
		const props = { children }
		return <App {...props} />
	}
}
