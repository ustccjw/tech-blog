import React from 'react'
import App from '../../component/app'
import NProgress from 'nprogress'

import './style'

import { loadProps } from '../../action/app'

export default class AppContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.any.isRequired,
    loading: React.PropTypes.bool.isRequired,
    reload: React.PropTypes.func.isRequired,
  }

  static loadProps = loadProps

  componentWillMount() {
    const { reload } = this.props
    global.reload = reload
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps
    loading ? NProgress.start() : NProgress.done()
  }

  shouldComponentUpdate(nextProps) {
    const { loading } = nextProps
    return !loading
  }

  render() {
    const { children } = this.props
    const appProps = { children }
    return <App {...appProps} />
  }
}
