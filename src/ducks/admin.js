/**
 * @flow
 * Responsibility: Admin-related redux
 */
import R from 'ramda'
import Future from 'fluture'

import { signInAdmin, logout } from 'functions/admin'

// Actions
export const ADMIN_SIGN_IN_PENDING = 'admin/ADMIN_SIGN_IN_PENDING'
export const ADMIN_SIGN_IN_RESOLVED = 'admin/ADMIN_SIGN_IN_RESOLVED'
export const ADMIN_SIGN_IN_REJECTED = 'admin/ADMIN_SIGN_IN_REJECTED'
export const ADMIN_LOGOUT_PENDING = 'admin/ADMIN_LOGOUT_PENDING'
export const ADMIN_LOGOUT_RESOLVED = 'admin/ADMIN_LOGOUT_RESOLVED'
export const ADMIN_LOGOUT_REJECTED = 'admin/ADMIN_LOGOUT_REJECTED'

// Creators
export const doSignInAdmin: Thunk = (
  email: string,
  password: string,
  resolve: ?Function,
  reject: ?Function
) => dispatch => {
  resolve = resolve || R.identity
  reject = reject || R.identity
  return Future.of(dispatch({ type: ADMIN_SIGN_IN_PENDING }))
    .chain(() => signInAdmin(email, password))
    .map(user => dispatch({ type: ADMIN_SIGN_IN_RESOLVED, data: user }))
    .mapRej(error => dispatch({ type: ADMIN_SIGN_IN_REJECTED, error }))
    .mapRej(R.prop('error'))
    .fork(reject, resolve)
}

export const doLogout: Thunk = (
  resolve: ?Function,
  reject: ?Function
) => dispatch => {
  resolve = resolve || R.identity
  reject = reject || R.identity
  return Future.of(dispatch({ type: ADMIN_LOGOUT_PENDING }))
    .chain(logout)
    .map(() => dispatch({ type: ADMIN_LOGOUT_RESOLVED }))
    .mapRej(error => dispatch({ type: ADMIN_LOGOUT_REJECTED, error }))
    .mapRej(R.prop('error'))
    .fork(reject, resolve)
}

// Reducer
const defaultState: AdminState = {
  loading: false,
  data: null,
  error: null
}

const reducer: Reducer<AdminState> = (state = defaultState, action) => {
  const { type, data, error } = action

  switch (type) {
    case ADMIN_SIGN_IN_PENDING:
      return {
        ...state,
        loading: true
      }
    case ADMIN_SIGN_IN_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case ADMIN_SIGN_IN_RESOLVED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case ADMIN_LOGOUT_PENDING:
      return {
        ...state,
        loading: true
      }
    case ADMIN_LOGOUT_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case ADMIN_LOGOUT_RESOLVED:
      return {
        ...state,
        loading: false,
        error: null,
        data: null
      }
    default:
      return state
  }
}

export default reducer
