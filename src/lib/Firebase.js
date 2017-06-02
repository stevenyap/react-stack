/**
 * @flow
 * Responsibility: Setup Firebase configuration and connection
 */
import firebase from 'firebase'

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL
} = process.env

const config = {
  projectId: FIREBASE_PROJECT_ID || '',
  apiKey: FIREBASE_API_KEY || '',
  authDomain: FIREBASE_AUTH_DOMAIN || '',
  databaseURL: FIREBASE_DATABASE_URL || ''
}

firebase.initializeApp(config)

export const dbServerTimestamp = firebase.database.ServerValue.TIMESTAMP
export const db = firebase.database()
export const auth = firebase.auth()
