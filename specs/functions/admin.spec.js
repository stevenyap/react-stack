import { signInAdmin, isAdmin } from 'functions/admin'
import { db } from 'lib/Firebase'

const admin = {
  uid: '-ADMINUSERID',
  email: 'admin@example.com'
}

jest.mock('functions/firebase', () => {
  const Future = require('fluture')
  const mock = require.requireActual('functions/firebase')
  const admin = {
    uid: '-ADMINUSERID',
    email: 'admin@example.com'
  }
  mock.signInWithEmailAndPassword = (email, password) => {
    if (email === admin.email) return Future.of(admin)
    return Future.reject({ message: 'invalid email' })
  }
  return mock
})

beforeEach(db.clearForTestCases)
beforeEach(() => db.mockedStorage.add(`/admins/users/${admin.uid}`, true))

describe('#signInAdmin', () => {
  const password = '******'

  asyncTest('return the firebase user', () => {
    const { uid, email } = admin
    return signInAdmin(email, password).expect(user => {
      expect(user.email).toBe(email)
      expect(user.uid).toBe(uid)
    })
  })

  asyncTest('rejects if user is not an admin', () => {
    return signInAdmin('INVALID', password).expectFail(error =>
      expect(error).toBe('invalid email')
    )
  })
})

describe('#isAdmin', () => {
  asyncTest('return true if uid is an admin', () => {
    const { uid } = admin
    return isAdmin(uid).expect(result => expect(result).toBe(true))
  })

  asyncTest('return false if uid is not an admin', () => {
    return isAdmin('INVALID').expect(result => expect(result).toBe(false))
  })
})
