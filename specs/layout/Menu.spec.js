import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Menu } from 'layout/Menu'

describe('Menu', () => {
  it('renders correctly for public', () => {
    const tree = renderJSON(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    )
    expect(tree).toMatchSnapshot()

    const renderedText = toText(tree)
    expect(renderedText).toContain('React Stack')
  })

  it('renders correctly for registered users', () => {
    const admin = { uid: 'UID' }
    const tree = renderJSON(
      <BrowserRouter>
        <Menu admin={admin} />
      </BrowserRouter>
    )
    expect(tree).toMatchSnapshot()

    const renderedText = toText(tree)
    expect(renderedText).toContain('React Stack')
    expect(renderedText).toContain('Logout')
  })
})
