/**
 * @flow
 * Responsibility: Render the footer
 */
import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap/lib'

import Colors from 'theme/Colors'

export const Footer = () => {
  return (
    <div style={styles.footer}>
      <Grid>
        <Row>
          <Col>
            © React Stack. All rights reserved.
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

const styles = {
  footer: {
    marginTop: 30,
    padding: 10,
    background: Colors.orange,
    color: Colors.white,
    textAlign: 'center'
  }
}

export default Footer
