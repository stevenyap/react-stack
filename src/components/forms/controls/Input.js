/**
 * @flow
 * Responsibility: We receive props from ReduxForm's Field and turn them into props for Bootstrap forms
 */
import type { Children } from 'react'

import React from 'react'
import {
  FormGroup,
  InputGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap/lib'

type Props = {
  input: Object,
  meta: Object,
  label: string,
  type: ?string,
  addon?: string | Children,
  addonPost?: string | Children
}
const Input = (props: Props) => {
  const { input, meta, label, type = 'text', addon, addonPost } = props
  // pass onBlur to enable touched flag
  // pass onChange so the ReduxForm can work
  const { value, onChange, onBlur } = input
  const { touched, error, submitting } = meta
  const validationState = !touched ? null : error ? 'error' : 'success'

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <InputGroup>
        {addon && <InputGroup.Addon>{addon}</InputGroup.Addon>}
        <FormControl
          disabled={submitting}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        />
        {addonPost && <InputGroup.Addon>{addonPost}</InputGroup.Addon>}
      </InputGroup>
      {touched && error && <HelpBlock>{error}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export default Input
