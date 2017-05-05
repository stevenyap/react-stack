import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Footer } from 'layout/Footer'

describe('Footer', () => {
  it('renders correctly', () => {
    const tree = renderJSON(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
    expect(tree).toMatchSnapshot()

    const renderedText = toText(tree)
    expect(renderedText).toContain('All rights reserved')
  })
})
