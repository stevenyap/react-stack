/**
 * @flow
 * Responsibility: Renders an error alert message
 */
import React from 'react'
import { Alert } from 'react-bootstrap/lib'

type Props = { text: string }
const ErrorMessage = (props: Props) => {
  const { text } = props

  return (
    <Alert bsStyle="danger">
      <p>{text}</p>
    </Alert>
  )
}

export default ErrorMessage
