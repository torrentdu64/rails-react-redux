import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';

import ProfilesIndex from './containers/profiles_index';
// import PostsNew from './containers/posts_new';
import BookingNew from './containers/bookings_new';

// import '../assets/stylesheets/application.scss';
import profilesReducer from './reducers/profiles_reducer';
import bookingReducer from './reducers/booking_reducer';
import busyTimeReducer from './reducers/busy_time_reducer';


const reducers = combineReducers({
  profiles: profilesReducer,
  form: formReducer,
  formError: bookingReducer,
  busy: busyTimeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const middlewares = applyMiddleware(reduxPromise, logger);

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxPromise, logger)))

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className="">
        <Switch>
          <Route path="/" exact component={ProfilesIndex} />
          <Route path="/profiles/:id" exact component={BookingNew} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
