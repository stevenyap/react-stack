// Setup file for Jest
// Add helper functions to global context
// Add test environment setup

import renderer from 'react-test-renderer'
import R from 'ramda'
import Future, { isFuture } from 'fluture'

// Mock firebase so we don't use database
jest.mock('firebase')

// Mock redux-form so we can render Fields for testing
jest.mock('redux-form')

// Defines Ramda as a global for convenience in debugging
global.R = R

// Define our own mocked fetch
global.setFetchToReturn = response => {
  global.fetch = jest.fn((url, options) =>
    Promise.resolve({
      json: () => Promise.resolve(response)
    })
  )
}

// Converts a react test renderer JSON to text
// for expectation testing
global.toText = tree => {
  const text = []

  if (tree.children) {
    tree.children.forEach(child => {
      if (typeof child !== 'object') {
        text.push(child)
      } else if (child.children) {
        text.push(toText(child))
      }
    })
  }

  return text.join(' ')
}

// Creates a react test renderer JSON
// that is not tracked in mobx
global.renderJSON = reactInstances => renderer.create(reactInstances).toJSON()

// sugar syntax to return text-only
// of a rendered React component
global.renderText = reactInstances => toText(renderJSON(reactInstances))

// pretty print JS object
global.ap = object => console.log(JSON.stringify(object, null, 2))

/**
 * Problem:
 * Exceptions thrown in Future within Jest are swallowed by Future
 * and Jest test will time out.
 * See https://github.com/fluture-js/Fluture/issues/77
 *
 * Monkey-patch Future with a new method #expect for easy testing
 * Wraps a function that might throw an exception (eg. expect statement)
 * in Future.try and return it as a FutureChain for further chaining
 * so that exceptions are properly channelled into rejection
 *
 * For example,
 *
 * Instead of:
 *    Future.of(1)
 *      .chain(aFutureThatReturnsAValue)
 *      .chain(((data) => Future.try(() => expect(data).toBe(value)))
 *      .fork(reject, resolve)
 *
 * We can:
 *    Future.of(1)
 *      .chain(aFutureThatReturnsAValue)
 *      .expect((data) => expect(data).toBe(value))
 *      .fork(reject, resolve)
 *
 * Note that the function is tapped (eg. it returns the received value)
 *
 * TODO: Solve the issue where a Future throws an exception but it freezes the promise
 * export const fetchReviewsFromDB = () =>
 *  Future.fromPromise(() => dbRef.limitToLast(100).once('value'), 0)
 *    .map(() => { throw new Error('Will time out Jest test') })
 */
Future.prototype.expect = function Future$expect(f) {
  const wrappedFunc = value => Future.try(() => R.tap(f)(value))
  return new Future.classes['FutureChain'](this, wrappedFunc)
}

Future.prototype.expectFail = function Future$expect(f) {
  // Chain a failure to ensure expectFail goes into rejection branch
  const guard = () => expect('ExpectFail not failing').toBe('a failure')
  const wrappedGuard = value => Future.try(() => R.tap(guard)(value))
  const futureChain = new Future.classes['FutureChain'](this, wrappedGuard)

  // ChainRej expectFail in rejection branch
  // Note that we expect an error object and we only pass in message
  const wrappedFunc = error => Future.try(() => R.tap(f)(error.message))
  return new Future.classes['FutureChainRej'](futureChain, wrappedFunc)
}

/**
 * Helper function to test a future in Jest which requires a promise
 * It basically executes the future via promise()
 */
global.asyncTest = (name, testCase) =>
  it(name, () => {
    const errorMessage = `asyncTest must return a future.
Did you forget to add a return in your test case?`

    return R.pipe(
      testCase,
      R.unless(isFuture, () => {
        throw new Error(errorMessage)
      }),
      R.invoker(0, 'promise')
    )()
  })
