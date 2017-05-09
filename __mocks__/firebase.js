import R from 'ramda'

// Definition of Firebase mock database
const cleanPath = path => path.replace(/[.$[\]#]/g, '-')
const generateID = () => String(parseInt(Math.random() * 10000000))

// TODO: Extract this into a npm
// Mock for Firebase
// It will keep all data that are set
// and returns it via #on or #once
class Tree {
  constructor() {
    this.store = {}
  }

  // Convert '/a/b/c' to [ 'a', 'b', 'c' ]
  // Takes care of extra slashes
  pathToArray(path) {
    const notEmptyString = string => string && string !== ''
    return R.pipe(R.filter(notEmptyString), R.map(cleanPath))(path.split('/'))
  }

  // Add a value to the path given
  add(path, value) {
    path = this.pathToArray(path)

    let prevRef = null
    let lastNode = null
    let nextRef = this.store

    path.forEach(node => {
      // Keep a reference to the last node
      // so that we can set it to value later
      prevRef = nextRef
      lastNode = node

      // Move down the path using nextRef
      if (!nextRef[node]) nextRef[node] = {}
      nextRef = nextRef[node]
    })

    // Set the value in this.store
    prevRef[lastNode] = value
  }

  // Retrieve the value at path
  retrieve(path) {
    path = this.pathToArray(path)

    try {
      let ref = this.store

      // Move down the tree
      path.forEach(node => {
        if (!ref[node]) throw new Error('Node not found')
        ref = ref[node]
      })

      return ref
    } catch (e) {
      return null
    }
  }

  toString() {
    return JSON.stringify(this.store, null, 4)
  }
}

let tree = new Tree()

class FirebaseMockDatabase {
  ref(node) {
    return new Ref(node)
  }

  // used for resetting the this for testing purpose
  clearForTestCases() {
    tree = new Tree()
  }

  // expose the internal tree for quicker test setup
  get mockedStorage() {
    return tree
  }

  // used for debugging the current state of db
  print() {
    console.log(tree.toString())
  }
}

class Ref {
  constructor(node) {
    this.path = cleanPath(node)
  }

  ref(node) {
    this.path = cleanPath(node)
    return this
  }

  set(obj) {
    tree.add(this.path, obj)
    return Promise.resolve()
  }

  update(obj) {
    return this.set(obj)
  }

  // TODO: filtering functions are not implemented
  limitToLast(n) {
    return this
  }

  orderByChild(node) {
    return this
  }

  startAt(value) {
    return this
  }

  transaction(func) {
    let snapshot = {}

    return this.once('value')
      .then(value => {
        value = value.val()
        value = value || {}
        const newValue = func(value)
        snapshot.val = () => newValue
        return this.set(newValue)
      })
      .then(() => ({
        error: null,
        committed: true,
        snapshot
      }))
  }

  once(target, callback) {
    let snapshot = {}
    snapshot.val = () => tree.retrieve(this.path)

    if (callback) {
      callback(snapshot)
    } else {
      return Promise.resolve(snapshot)
    }
  }

  on(target, callback) {
    return this.once(target, callback)
  }

  push(value, callback) {
    const _id = generateID()

    if (value) {
      return this.push().then(ref => ref.set(value)).then(() => {
        // eslint-disable-next-line promise/no-callback-in-promise
        if (callback) return callback(null)
        return null
      })
    } else {
      return this.ref(this.path + `/${_id}`)
    }
  }

  get key() {
    return R.last(this.path.split('/'))
  }
}

// Exported mock Firebase module
const firebase = {
  initializeApp: config => firebase,
  database: () => new FirebaseMockDatabase(),
  auth: () => ({
    signOut: () => Promise.resolve(),
    signInWithCustomToken: token => Promise.resolve(true),
    onAuthStateChanged: callbacks => {}
  })
}

firebase.database['ServerValue'] = { TIMESTAMP: '_' }

export default firebase
