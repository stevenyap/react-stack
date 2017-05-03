/**
 * @flow
 * Responsibility: Setup the redux Store and initialise state
 */
import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-seamless-immutable'
import thunk from 'redux-thunk'
import reducers from 'ducks/index'
import { reducer as formReducer } from 'redux-form'
// $FlowFixMe: autoRehydrate is not typed in redux-persist
import { autoRehydrate, persistStore } from 'redux-persist'
import createMigration from 'redux-persist-migrate'
import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

import { markHydrationCompleted } from 'ducks/app'

if (__DEV__) {
  Reactotron.configure().use(reactotronRedux()).connect()

  // Clear Reactotron of previous loggings
  Reactotron.clear()
}

// Configure migration with redx-persist-migrate
const manifest = {
  '1': state => state
}
const migration = createMigration(manifest, 'migration')
const migrationReducer = state => state

// Create the Store
const initialState = {}
const middlewares = compose(applyMiddleware(thunk), autoRehydrate(), migration)
const rootReducers = combineReducers({
  ...reducers,
  migration: migrationReducer,
  form: formReducer
})
const create = __DEV__ ? Reactotron.createStore : createStore
const Store = create(rootReducers, initialState, middlewares)

// State initialisation and listeners
const { dispatch } = Store

// Persist redux store in local storage
// Don't persist form
persistStore(Store, { blacklist: ['form'] }, () => {
  dispatch(markHydrationCompleted())
})

export default Store
