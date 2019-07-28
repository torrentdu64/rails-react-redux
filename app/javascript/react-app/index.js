import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';

import ProfilesIndex from './containers/profiles_index';
// import PostsNew from './containers/posts_new';
import Modal from './components/Modal';

// import '../assets/stylesheets/application.scss';
import profilesReducer from './reducers/profiles_reducer';


const reducers = combineReducers({
  profiles: profilesReducer,
  form: formReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, {}, middlewares)}>
    <Router >
      <div className="">
        <Switch>
          <Route path="/" exact component={ProfilesIndex} />
          {/*<Route path="/posts/new" exact component={PostsNew} />*/}
          <Route path="/profiles/:id" exact component={Modal} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
