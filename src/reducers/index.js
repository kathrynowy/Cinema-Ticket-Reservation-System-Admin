import { combineReducers } from "redux";

import cinemas from './cinemas';
import movies from './movies';
import sessions from './sessions';
import halls from './halls';
import services from './services';


const rootReducer = combineReducers({
  cinemas,
  movies,
  sessions,
  halls,
  services
});

export default rootReducer;
