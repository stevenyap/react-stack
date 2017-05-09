import reducer from 'ducks/admin'

describe('Reducer', () => {
  describe('Redux reducer behavior checks', () => {
    const defaultState = {
      loading: false,
      data: null,
      error: null
    }
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
