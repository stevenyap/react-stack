import React from 'react'

import { Home } from 'pages/Home'

describe('Home', () => {
  it('renders correctly', () => {
    const tree = renderJSON(<Home />)
    expect(tree).toMatchSnapshot()

    const renderedText = toText(tree)
    expect(renderedText).toContain('Welcome to react stack!')
  })
})
