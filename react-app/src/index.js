import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app/App';
import App from './app/App';
// import './alt-css/minty.css';
import 'bootstrap/dist/css/bootstrap.css';
import './app/home/alt-css/index.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware,compose } from 'redux';
import rootReducer from './reducers';
import {projetcsOperations} from './app/nav/duck/';
import config from './config';

const composeEnhancers = /*window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||*/ compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

// const store = createStore(rootReducer)


store.dispatch(projetcsOperations.fetchAllProjects(config.API_URL+"/projects"));
// store.dispatch(projetcsOperations.fetchAllProjects(config.API_URL+"/i2b2Ontologies"));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
