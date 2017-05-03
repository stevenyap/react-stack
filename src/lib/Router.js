/**
 * @flow
 * Responsibility: Declare all routes in the app
 * Menu has to be included due to <Link> requiring BrowserRouter as context
 */
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Menu from 'components/Menu'
import Home from 'pages/Home'

export const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Route path="/" component={Home} />
      </div>
    </BrowserRouter>
  )
}

export default Router
