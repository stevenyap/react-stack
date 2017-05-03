import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Menu } from 'components/Menu'

describe('Menu', () => {
  it('renders correctly', () => {
    const tree = renderJSON(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    )
    expect(tree).toMatchSnapshot()

    const renderedText = toText(tree)
    expect(renderedText).toContain('Home')
  })
})
