/**
 * ReduxForm requires a store to be present
 * but we don't want to run tests with a store
 * Hence, we monkey-patch redux-form to return empty outputs
 */
import React from 'react'

const ReduxForm = require.requireActual('redux-form')

// ReduxForm Field/FormSection requires the component to be in a parent component
// that is decorated with redux-form
// So we make Field render the input instead
ReduxForm.Field = props => {
  const { component: Component, ...others } = props
  const input = { onChange: () => {} }
  const meta = {}
  return <Component input={input} meta={meta} {...others} />
}

ReduxForm.FormSection = props => {
  const { children } = props
  return <div>{children}</div>
}

// Make reduxForm decorator returns the same component
ReduxForm.reduxForm = () => Component => Component

const {
  actionTypes,
  arrayInsert,
  arrayMove,
  arrayPop,
  arrayPush,
  arrayRemove,
  arrayRemoveAll,
  arrayShift,
  arraySplice,
  arraySwap,
  arrayUnshift,
  autofill,
  blur,
  change,
  destroy,
  Field,
  Fields,
  FieldArray,
  Form,
  FormSection,
  focus,
  formValueSelector,
  getFormNames,
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSyncWarnings,
  getFormSubmitErrors,
  initialize,
  isDirty,
  isInvalid,
  isPristine,
  isValid,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed,
  propTypes,
  reducer,
  reduxForm,
  registerField,
  reset,
  setSubmitFailed,
  setSubmitSucceeded,
  startAsyncValidation,
  startSubmit,
  stopAsyncValidation,
  stopSubmit,
  submit,
  SubmissionError,
  touch,
  unregisterField,
  untouch,
  values
} = ReduxForm

export {
  actionTypes,
  arrayInsert,
  arrayMove,
  arrayPop,
  arrayPush,
  arrayRemove,
  arrayRemoveAll,
  arrayShift,
  arraySplice,
  arraySwap,
  arrayUnshift,
  autofill,
  blur,
  change,
  destroy,
  Field,
  Fields,
  FieldArray,
  Form,
  FormSection,
  focus,
  formValueSelector,
  getFormNames,
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSyncWarnings,
  getFormSubmitErrors,
  initialize,
  isDirty,
  isInvalid,
  isPristine,
  isValid,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed,
  propTypes,
  reducer,
  reduxForm,
  registerField,
  reset,
  setSubmitFailed,
  setSubmitSucceeded,
  startAsyncValidation,
  startSubmit,
  stopAsyncValidation,
  stopSubmit,
  submit,
  SubmissionError,
  touch,
  unregisterField,
  untouch,
  values
}
