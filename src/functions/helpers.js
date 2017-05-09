/**
 * @flow
 * Responsibility: Various helper functions that can't be placed elsewhere
 */
import R from 'ramda'
import Future from 'fluture'

// Rejects a Future with an error object containing the rejectMessage
// if predicate evaluates to true
// else return a Future
// Use for chaining checks in Future
export const rejectFutureIf = (
  predicate: (a: any) => boolean,
  rejectMessage: string
) =>
  R.ifElse(predicate, () => Future.reject(new Error(rejectMessage)), Future.of)
