import { combineReducers } from "redux";

import cinemas from './cinemas';
import movies from './movies';
import sessions from './sessions';
import halls from './halls'


const rootReducer = combineReducers({
  cinemas,
  movies,
  sessions,
  halls
});

export default rootReducer;
