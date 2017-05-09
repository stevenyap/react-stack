/**
 * @flow
 * Responsibility: Renders the Login form
 */
import React from 'react'
import { Field } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import { Input, SubmitButton } from 'components/forms/controls/index'
import { isRequired, isEmail } from 'functions/validators'

type Props = { error?: string, submitting: boolean, handleSubmit: Function }
const LoginForm = (props: Props) => {
  const { error, submitting, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage text={error} />}

      <Field
        name="email"
        component={Input}
        validate={[isRequired, isEmail]}
        label="Email:"
      />

      <Field
        name="password"
        component={Input}
        validate={[isRequired]}
        type="password"
        label="Password:"
      />

      <SubmitButton text="Submit" submitting={submitting} />
    </form>
  )
}

export default LoginForm
