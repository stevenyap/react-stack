/**
 * @flow
 * Responsibility: To instantiate app-level setting such as Store and Router
 */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Store from 'lib/Store'
import Layout from 'layout/index'

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  )
}

export default App
