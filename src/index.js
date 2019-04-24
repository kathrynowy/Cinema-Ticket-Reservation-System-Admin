import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import { axiosBaseUrl } from "./configs/config";

import App from './App';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import rootReducer from "./reducers/index";
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
axios.defaults.baseURL = axiosBaseUrl;

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root')
);
