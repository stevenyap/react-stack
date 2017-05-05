/**
 * @flow
 * Responsibility: Render the layout of the app
 */
import React from 'react'

import Menu from 'layout/Menu'
import MainBody from 'layout/MainBody'

export const Layout = () => {
  return (
    <div>
      <Menu />
      <MainBody />
    </div>
  )
}

export default Layout
