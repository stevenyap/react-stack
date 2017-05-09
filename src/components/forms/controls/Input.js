/**
 * @flow
 * Responsibility: We receive props from ReduxForm's Field and turn them into props for Bootstrap forms
 */
import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap/lib'

type Props = { input: Object, meta: Object, label: string, type: ?string }
const Input = (props: Props) => {
  const { input, meta, label, type = 'text' } = props
  // pass onBlur to enable touched flag
  // pass onChange so the ReduxForm can work
  const { value, onChange, onBlur } = input
  const { touched, error } = meta
  const validationState = !touched ? null : error ? 'error' : 'success'

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        type={type}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
      {touched && error && <HelpBlock>{error}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export default Input
