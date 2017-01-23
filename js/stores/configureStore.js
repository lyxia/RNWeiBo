import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'

var store = null
function configureStore(onComplete) {
  const reducers = require('../reducers');
  store = createStore(reducers, applyMiddleware(thunkMiddleware, promiseMiddleware))
  return store
}

function getStore() {
  return store
}

function getState() {
  if (store) {
    return store.getState()
  }
  return null
}

function dispatch(action) {
  if (store) {
    store.dispatch(action)
  }
  return null
}

module.exports = {configureStore, getStore, getState, dispatch}
