import { combineReducers } from 'redux'
import { userReducer, postsReducer } from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
})

export default rootReducer
