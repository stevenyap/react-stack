/* eslint-disable no-undef, no-unused-vars, no-console */

import type { Dispatch as ReduxDispatch, Reducer as ReduxReducer } from 'redux'
import type { Dispatch as ThunkDispatch, Thunk as ReduxThunk } from 'redux-thunk'

// State
declare type State = Exact<{
  app: AppState
}>

declare type AppState = Exact<{
  isHydrated: boolean
}>

// Action
declare type Action = {
  type: string,
  data?: *,
  error?: ?ErrorType
}

// Reducer
declare type Reducer<DuckState> = ReduxReducer<DuckState, Action>

// Creators
declare type Creator = (...args: any) => Action
declare type Thunk = ReduxThunk<State>
declare type Dispatch = ReduxDispatch<Action> & ThunkDispatch<State>

// Misc
declare type ErrorType = {
  message: string
}
