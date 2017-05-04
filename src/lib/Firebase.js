/**
 * @flow
 * Responsibility: To setup Firebase and expose Firebase helper functions as Future
 */
import R from 'ramda'
import Future from 'fluture'
import firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
}

firebase.initializeApp(config)

export const dbServerTimestamp = firebase.database.ServerValue.TIMESTAMP
export const db = firebase.database()
export const firebaseAuth = firebase.auth()

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
