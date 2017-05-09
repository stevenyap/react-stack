/* eslint-disable no-undef, no-unused-vars, no-console */

import type { Dispatch as ReduxDispatch, Reducer as ReduxReducer } from 'redux'
import type {
  Dispatch as ThunkDispatch,
  Thunk as ReduxThunk
} from 'redux-thunk'

// State
declare type State = Exact<{
  app: AppState,
  admin: AdminState
}>

declare type AppState = Exact<{
  isHydrated: boolean
}>

declare type AdminState = Exact<{
  loading: boolean,
  data: ?Admin,
  error: ?ErrorType
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
