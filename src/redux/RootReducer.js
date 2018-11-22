import { combineReducers } from 'redux'
import { userReducer, postsReducer, templateReducer } from './reducers'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  template: templateReducer,
})

export default rootReducer
