import reducer, { HYDRATION_COMPLETED, markHydrationCompleted } from 'ducks/app'

describe('#markHydrationCompleted', () => {
  it('returns an action', () => {
    const { type } = markHydrationCompleted()
    expect(type).toBe(HYDRATION_COMPLETED)
  })
})

describe('Reducer', () => {
  describe('Redux reducer behavior checks', () => {
    const defaultState = { isHydrated: false }
    const unknownAction = { type: 'INVALID_TYPE' }

    it('defines an default state if no state is given', () => {
      const newState = reducer(undefined, unknownAction)
      expect(newState).toEqual(defaultState)
    })

    it('returns old state if no action type matches', () => {
      const oldState = { key: 'value' }
      const newState = reducer(oldState, unknownAction)
      expect(newState).toEqual(oldState)
    })
  })
})
