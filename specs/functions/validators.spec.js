import { isRequired, isEmail } from 'functions/validators'

describe('#isRequired', () => {
  const errorMsg = 'This field is required.'

  it('validates if a string is non-empty', () => {
    expect(isRequired('')).toBe(errorMsg)
    expect(isRequired()).toBe(errorMsg)
    expect(isRequired(null)).toBe(errorMsg)
    expect(isRequired('something')).toBeUndefined()
  })
})

describe('#isEmail', () => {
  const errorMsg = 'Email is invalid.'

  it('validates if a string is a valid email', () => {
    expect(isEmail('')).toBe(errorMsg)
    expect(isEmail()).toBe(errorMsg)
    expect(isEmail(null)).toBe(errorMsg)
    expect(isEmail('a@a')).toBe(errorMsg)
    expect(isEmail('a@a.com')).toBeUndefined()
  })
})
