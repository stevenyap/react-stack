/**
 * @flow
 * Responsibility: Firebase-related functions
 */
import R from 'ramda'
import Future from 'fluture'
import { db } from 'lib/Firebase'

/**
 * Helper methods
 */

// Returns a Future that resolves to the value of db path
// It will call .val() on the snapshot that is returned from Firebase
export const dbValue = (path: string): FutureType<*> =>
  Future.fromPromise(() => db.ref(path).once('value'))().map(snapshot =>
    snapshot.val()
  )

// Returns a Future that sets the data on the path
export const dbSet = R.curry((path: string, data: *): FutureType<void> =>
  Future.fromPromise(() => db.ref(path).set(data))()
)
