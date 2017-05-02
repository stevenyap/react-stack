import React from 'react'

import { App } from 'App'

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderJSON(<App />)
    expect(tree).toMatchSnapshot()

    const renderedText = toText(tree)
    expect(renderedText).toContain('Welcome to react stack!')
  })
})
