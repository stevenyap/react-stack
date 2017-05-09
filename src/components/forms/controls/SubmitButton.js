/**
 * @flow
 * Responsibility: Render a submit button
 */
import React from 'react'
import Button from 'react-bootstrap/lib/Button'

type Props = {
  onClick: Function,
  submitting: boolean,
  text: ?string,
  submittingText: ?string
}
const SubmitButton = (props: Props) => {
  const {
    onClick,
    submitting,
    text = 'Submit',
    submittingText = 'Submitting...'
  } = props

  return (
    <Button
      bsStyle="success"
      type="submit"
      onClick={onClick}
      disabled={submitting}>
      {submitting ? submittingText : text}
    </Button>
  )
}

export default SubmitButton
