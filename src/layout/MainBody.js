/**
 * @flow
 * Responsibility: Render the main body of the app
 */
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import Grid from 'react-bootstrap/lib/Grid'

import Home from 'pages/Home'
import Login from 'pages/Login'

type Props = { admin: ?Admin, isHydrated: boolean }
export const MainBody = (props: Props) => {
  const { admin, isHydrated } = props
  if (!isHydrated) return null

  return (
    <Grid style={styles.container}>
      {!admin && <Route children={() => <Login />} />}
      {admin &&
        <Switch>
          <Route exact={true} path="/" component={Home} />
        </Switch>}
    </Grid>
  )
}

const styles = {
  container: {
    flex: '1'
  }
}

const mapStateToProps = (state: State): Props => ({
  admin: state.admin.data,
  isHydrated: state.app.isHydrated
})

// Need withRouter here as we are connecting to Redux
// https://github.com/ReactTraining/react-router/issues/4671
export default R.compose(withRouter, connect(mapStateToProps))(MainBody)
