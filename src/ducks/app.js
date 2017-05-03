/**
 * @flow
 * Responsibility: App-level related redux
 */

// Actions
export const HYDRATION_COMPLETED = 'app/HYDRATION_COMPLETED'

// Creators
export const markHydrationCompleted: Creator = () => {
  return { type: HYDRATION_COMPLETED }
}

// Reducer
const defaultState: AppState = {
  isHydrated: false
}

const reducer: Reducer<AppState> = (state = defaultState, action) => {
  const { type } = action

  switch (type) {
    case HYDRATION_COMPLETED:
      return {
        ...state,
        isHydrated: true
      }
    default:
      return state
  }
}

export default reducer
