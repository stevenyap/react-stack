/**
 * @flow
 * Responsbility: Render a ReduxForm select field
 */
import React from 'react'
import R from 'ramda'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap/lib'

type Option = { label: string, value: string }
type Options = Array<Option>
const optionToHTML = (option: Option) => {
  const { label, value } = option
  return <option key={value + label} value={value}>{label}</option>
}

type Props = {
  input: Object,
  meta: Object,
  label: string,
  type: ?string,
  options: Options
}
const Select = (props: Props) => {
  const { input, meta, label, options } = props
  // pass onBlur to enable touched flag
  // pass onChange so the ReduxForm can work
  const { value, onChange, onBlur } = input
  const { touched, error } = meta
  const validationState = !touched ? null : error ? 'error' : 'success'
  const optionsHTML = R.map(optionToHTML, options)

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        componentClass="select"
        onBlur={onBlur}
        onChange={onChange}
        value={value}>
        {optionsHTML}
      </FormControl>
      {touched && error && <HelpBlock>{error}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export default Select
