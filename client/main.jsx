import 'babel-core/polyfill'

import React from 'react'
import history from './history'
import Root from './root'

window.React = React

React.render(<Root history={history} />, document.querySelector('.react-root'))
