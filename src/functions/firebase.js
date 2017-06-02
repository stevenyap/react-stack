/**
 * @flow
 * Responsibility: Converts Firebase promise-based functions into futures
 */
import R from 'ramda'
import Future from 'fluture'
import { db, auth } from 'lib/Firebase'

// Returns a Future that resolves to the value of db path
// It will call .val() on the snapshot that is returned from Firebase
export const dbValue = (path: string): Fluture<FirebaseError, FirebaseValue> =>
  Future.encaseP(() => db.ref(path).once('value'))().map(snapshot =>
    snapshot.val()
  )

// Returns a Future that sets the data on the path
export const dbSet = R.curry((path: string, data: *): Fluture<
  FirebaseError,
  void
> => Future.encaseP(() => db.ref(path).set(data))())

// Returns a Future that remove the data on the path
export const dbRemove = (path: string): Fluture<FirebaseError, void> =>
  Future.encaseP(() => db.ref(path).remove())()

// Returns a Future that do a multi-path update
// Firebase multi-location update works like set() instead update()
// in that it actually overwrites the data at the specified paths
type UpdateObj = { [path: string]: FirebaseValue }
export const dbMultiSet = (
  updateObj: UpdateObj
): Fluture<FirebaseError, void> =>
  Future.encaseP(() => db.ref().update(updateObj))()

// Like dbValue but only returns records from the lastUpdatedTimestamp
export const dbSync = (
  lastUpdatedTimestamp: number,
  path: string
): Fluture<FirebaseError, FirebaseValue> =>
  Future.encaseP(() =>
    db
      .ref(path)
      .orderByChild('updatedAt')
      .startAt(lastUpdatedTimestamp + 1)
      .once('value')
  )().map(snapshot => snapshot.val())

// Setup the subscription to Firebase with callback but passed in the val() of the snapshot
// Only stream changes based on updatedAt from current time
type Event = 'child_added' | 'child_changed' | 'child_removed' | 'child_moved'
type Callback = (data: FirebaseValue) => any
export const dbSubscribe = R.curry(
  (path: string, event: Event, callback: Callback): void => {
    db
      .ref(path)
      .orderByChild('updatedAt')
      .startAt(Date.now())
      .on(event, snapshot => callback(snapshot.val()))
  }
)

// Returns a Future for signInWithEmailAndPassword
export const signInWithEmailAndPassword = R.curry(
  (email: string, password: string): Fluture<FirebaseError, User> =>
    Future.encaseP(() => auth.signInWithEmailAndPassword(email, password))()
)

// Returns a Future for createUserWithEmailAndPassword
export const createUserWithEmailAndPassword = R.curry(
  (email: string, password: string): Fluture<FirebaseError, User> =>
    Future.encaseP(() => auth.createUserWithEmailAndPassword(email, password))()
)

// Signs out from Firebase
export const signOut = (): Fluture<FirebaseError, void> =>
  Future.encaseP(() => auth.signOut())()
