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
) => (a: any) =>
  Future((reject, resolve) => {
    predicate(a) ? reject(new Error(rejectMessage)) : resolve(a)
  })

// Return the biggest updatedAt field
type NestedObject = { [id: string]: { updatedAt: number } }
export const findLastUpdatedAt = (data: ?NestedObject): number => {
  return R.pipe(R.values, R.map(R.prop('updatedAt')), findLargestNumber)(
    data || {}
  )
}

// Returns the largest number in an array or zero for empty array
export const findLargestNumber = (data: Array<number>): number =>
  R.reduce(R.max, 0, data)
