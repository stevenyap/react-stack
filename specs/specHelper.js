// Setup file for Jest
// Add helper functions to global context
// Add test environment setup

import renderer from 'react-test-renderer'
import R from 'ramda'

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
