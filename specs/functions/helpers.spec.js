import { findLastUpdatedAt } from 'functions/helpers'

describe('#findLastUpdatedAt', () => {
  const data = {
    ONE: { updatedAt: 100 },
    TWO: { updatedAt: 300 },
    THREE: { updatedAt: 200 }
  }

  it('returns the biggest updatedAt field', () => {
    expect(findLastUpdatedAt(data)).toBe(300)
  })
})
