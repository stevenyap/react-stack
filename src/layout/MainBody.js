/**
 * @flow
 * Responsibility: Render the main body of the app
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Grid from 'react-bootstrap/lib/Grid'

import Home from 'pages/Home'

export const MainBody = () => {
  return (
    <Grid style={styles.container}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    </Grid>
  )
}

const styles = {
  container: {
    flex: '1'
  }
}

export default MainBody
