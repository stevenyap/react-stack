/**
 * @flow
 * Responsibility: Admin-related functions
 */
import R from 'ramda'

import { signInWithEmailAndPassword, dbValue } from 'functions/firebase'
import { rejectFutureIf } from 'functions/helpers'

// Signs in an admin using email and password
export const signInAdmin = (
  email: string,
  password: string
): Fluture<Error, Admin> => {
  let firebaseUser

  return signInWithEmailAndPassword(email, password)
    .map(R.pick(['uid', 'email']))
    .map(
      R.tap(user => {
        firebaseUser = user
      })
    )
    .map(R.propOr('__', 'uid'))
    .chain(isAdmin)
    .chain(rejectFutureIf(R.not, 'User is not an admin.'))
    .map(() => firebaseUser)
}

// Return true if uid is an admin
// otherwise false
export const isAdmin = (uid: string): Fluture<boolean, boolean> => {
  // will throw PERMISSION_DENIED error if user is not admin
  return dbValue(`/admins/users/${uid}`).map(Boolean).mapRej(R.F)
}

// We expose Firebase #signOut as #logout here
// to decouple other codes from depending directly on Firebase
export { signOut as logout } from 'functions/firebase'
