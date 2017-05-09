/**
 * @flow
 * Responsibility: To display the homepage content
 */
import React from 'react'
import { reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap/lib'

import LoginForm from 'components/forms/Login'
import { submitLogin } from 'functions/submits/login'

const Login = () => {
  return (
    <Row>
      <Col>
        <h1>Login</h1>
      </Col>
      <Col>
        <DecoratedLoginForm />
      </Col>
    </Row>
  )
}

// Decorate LoginForm so that form is pure
const DecoratedLoginForm = reduxForm({
  form: 'login',
  // Separate submitLogin into another file
  // since the function is decoupled from Login
  onSubmit: submitLogin
})(LoginForm)

export default Login
