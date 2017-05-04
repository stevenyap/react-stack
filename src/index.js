/**
 * @flow
 * Responsibility: To inject App into HTML with hot module replacement
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // AppContainer is a necessary wrapper component for HMR

import App from 'App'

const hotRender = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

hotRender(App)

// Hot Module Replacement API
declare var module: Object
if (module.hot) module.hot.accept('App', () => hotRender(App))
