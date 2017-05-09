/**
 * @flow
 * Responsibility: validation-related functions
 * Following redux-form convention, functions will return undefined if passed validation
 * and an error message if failed
 */
import R from 'ramda'

type ValidatorResponse = void | string

export const isRequired = (value: ?string): ValidatorResponse =>
  value ? undefined : 'This field is required.'

export const isEmail = (value: ?string): ValidatorResponse =>
  R.pipe(
    String,
    R.ifElse(
      R.test(/^.+@.+\..+$/),
      R.always(undefined),
      R.always('Email is invalid.')
    )
  )(value)
