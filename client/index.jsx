import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory as history } from 'react-router'
import Loader from 'halogen/PacmanLoader'
import AsyncProps from '../lib/async-props'

let rootElement = document.querySelector('main')
if (!rootElement) {
  rootElement = document.body.appendChild(document.createElement('main'))
}
const onError = err => console.error(err)
const renderLoading = () => <Loader color="#26A65B" />

let render = () => {
  const routes = require('../route').default
  const router = (
    <Router key={Math.random()} routes={routes} history={history}
      render={props => <AsyncProps {...props} onError={onError}
      renderLoading={renderLoading} />} />
  )
  ReactDOM.render(router, rootElement)
}

if (module.hot) {
  const renderApp = render
  const renderError = error => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={error} />, rootElement)
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept('../route', render)
}

render()

global.React = React
