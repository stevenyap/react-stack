/**
 * @flow
 * Responsibility: Converts Firebase promise-based functions into futures
 */
import R from 'ramda'
import Future from 'fluture'
import { db, auth } from 'lib/Firebase'

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

// Returns a Future for signInWithEmailAndPassword
export const signInWithEmailAndPassword = R.curry(
  (email: string, password: string): FutureType<FirebaseUser> =>
    Future.fromPromise(() => auth.signInWithEmailAndPassword(email, password))()
)

// Signs out from Firebase
export const signOut = (): FutureType<void> =>
  Future.fromPromise(() => auth.signOut())()
