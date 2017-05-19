/**
 * @flow
 * Responsibility: To inject React into DOM with app-level settings such as hot module replacement, Store & Router
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' // AppContainer is a necessary wrapper component for HMR

import Store from 'lib/Store'
import Layout from 'layout/index'

const hotRender = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={Store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

hotRender(Layout)

// Hot Module Replacement API
declare var module: Object
if (module.hot) module.hot.accept('layout/index', () => hotRender(Layout))
