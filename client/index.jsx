import 'babel-core/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'

window.React = React

ReactDOM.render(<Root />, document.querySelector('.react-root'))
