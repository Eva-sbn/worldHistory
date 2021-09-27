import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger/src'
import { composeWithDevTools } from 'redux-devtools-extension'
import timeline from "./features/timeline"
import users from "./features/users"


const logger = createLogger()

export const store = createStore(combineReducers({
  timeline,
  users,
}), composeWithDevTools(applyMiddleware(thunk, logger)))