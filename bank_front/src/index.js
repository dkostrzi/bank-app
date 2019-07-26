import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth'
import userReducer from './store/reducers/user'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
const composeEnhancers = process.env.NODE_ENV ==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose ;

const rootReducer = combineReducers({
  auth:authReducer,
  user:userReducer,
  toastr: toastrReducer // <- Mounted at toastr.
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
