/**
 * @flow
 * Responsibility: Handle the submit for login form
 */
import { SubmissionError } from 'redux-form'

import { doSignInAdmin } from 'ducks/admin'

type SubmitFunction = (
  values: { email: ?string, password: ?string },
  dispatch: Dispatch,
  props: {}
) => Promise<void>
export const submitLogin: SubmitFunction = (values, dispatch, props) => {
  const { email, password } = values

  return new Promise((resolve, reject) => {
    const onReject = error => {
      const { message } = error
      reject(new SubmissionError({ _error: message }))
    }

    dispatch(doSignInAdmin(email, password, resolve, onReject))
  })
}
