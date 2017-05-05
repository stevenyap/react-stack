/**
 * @flow
 * Responsibility: Render the main body of the app
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'pages/Home'

export const MainBody = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
    </Switch>
  )
}

export default MainBody
