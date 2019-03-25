import { combineReducers } from "redux";

import cinemas from './cinemas'
import movies from './movies'


const rootReducer = combineReducers({
  cinemas,
  movies
});

export default rootReducer;
