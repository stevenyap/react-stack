import React from 'react'

import LoginForm from 'components/forms/Login'

describe('LoginForm', () => {
  it('renders correctly', () => {
    const tree = renderJSON(<LoginForm />)
    expect(tree).toMatchSnapshot()

    const renderedText = toText(tree)
    expect(renderedText).toContain('Email')
    expect(renderedText).toContain('Password')
    expect(renderedText).toContain('Submit')
  })
})
