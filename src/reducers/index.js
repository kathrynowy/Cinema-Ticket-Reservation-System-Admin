import { combineReducers } from "redux";

import cinemas from './cinemas'
import movies from './movies'
import sessions from './sessions'


const rootReducer = combineReducers({
  cinemas,
  movies,
  sessions
});

export default rootReducer;
