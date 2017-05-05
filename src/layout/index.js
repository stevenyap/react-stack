/**
 * @flow
 * Responsibility: Render the layout of the app
 */
import React from 'react'

import Menu from 'layout/Menu'
import MainBody from 'layout/MainBody'
import Footer from 'layout/Footer'

export const Layout = () => {
  return (
    <div style={styles.container}>
      <Menu />
      <MainBody />
      <Footer />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}

export default Layout
