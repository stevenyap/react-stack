import { dbSet, dbValue } from 'functions/firebase'
import { db } from 'lib/Firebase'

beforeEach(db.clearForTestCases)

const path = '/path/to/somewhere'
const storedValue = 'THE_GOLDEN_RULE'

describe('#dbValue', () => {
  asyncTest('gets the value of a path', () => {
    db.mockedStorage.add(path, storedValue)

    return dbValue(path).expect(value => expect(value).toBe(storedValue))
  })
})

describe('#dbSet', () => {
  asyncTest('gets the value of a path', () => {
    return dbSet(path, storedValue)
      .map(() => db.mockedStorage.retrieve(path))
      .expect(value => expect(value).toBe(storedValue))
  })
})
