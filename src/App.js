/**
 * @flow
 * Responsibility: To instantiate app-level setting such as Store and Router
 */
import React from 'react'
import { Provider } from 'react-redux'

import Store from 'lib/Store'
import Router from 'lib/Router'

const App = () => {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  )
}

export default App
