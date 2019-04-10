import { combineReducers } from "redux";

import cinemas from './cinemas';
import movies from './movies';
import sessions from './sessions';
import halls from './halls';
import services from './services';
import auth from './auth';

const rootReducer = combineReducers({
  cinemas,
  movies,
  sessions,
  halls,
  services,
  auth
});

export default rootReducer;
