/**
 * @flow
 * Responsibility: Setup Firebase configuration and connection
 */
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
