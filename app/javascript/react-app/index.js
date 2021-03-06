import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';
import { StripeProvider } from 'react-stripe-elements';

import ProfilesIndex from './containers/profiles_index';
// import PostsNew from './containers/posts_new';
import BookingNew from './containers/bookings_new';

// import '../assets/stylesheets/application.scss';
import profilesReducer from './reducers/profiles_reducer';
import bookingReducer from './reducers/booking_reducer';
import busyTimeReducer from './reducers/busy_time_reducer';
import busyNowReducer from './reducers/busy_now_reducer';
import profileReducer from './reducers/profile_reducer';


const reducers = combineReducers({
  profiles: profilesReducer,
  form: formReducer,
  formError: bookingReducer,
  busy: busyTimeReducer,
  now: busyNowReducer,
  profile: profileReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const middlewares = applyMiddleware(reduxPromise, logger);


let myroot = document.getElementById('root');





MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // look through all mutations that just occured
    for(var i=0; i<mutations.length; ++i) {
        // look through all added nodes of this mutation
        for(var j=0; j<mutations[i].addedNodes.length; ++j) {
            // was a child added with ID of 'root'?
            if(mutations[i].addedNodes[j].id == "root") {
               myroot = document.getElementById('root');
                ReactDOM.render(
                <StripeProvider apiKey="pk_test_wRZncdxvPwvZgNqo09x4Gxbx">
                  <Provider store={store}>
                    <Router history={history}>
                      <div className="">
                        <Switch>
                          <Route path="/" exact component={ProfilesIndex} />
                          <Route path="/profiles/:id" exact component={BookingNew} />
                        </Switch>
                      </div>
                    </Router>
                  </Provider>
                </StripeProvider>,
                myroot
              );

               const initialState = {};

            }
        }
    }
});

observer.observe(document, {
  attributes: true,
  childList: true,
  characterData: true,
  subtree : true
});




  const initialState  = {};

try{


  debugger
if( myroot.dataset.booking !== undefined || myroot.dataset.profiles !== undefined || myroot.dataset.profiles !==  "undefined" || myroot !== null ){
  if(myroot.dataset.profiles === "undefined" && myroot.dataset.booking === "undefined"){
    debugger
    const initialState  = {};
  }else{
    debugger;
    const initialState  = {
      profiles: JSON.parse(myroot.dataset.profiles),
      busy: JSON.parse(myroot.dataset.booking)
    };
  }
}else{
  debugger;
  const initialState  = {
    profiles: [],
    busy: []
  };
}

}catch(err){
  console.log("myroot", err)


}






const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(reduxPromise, logger)))


//const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxPromise, logger)))


// MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// var observer = new MutationObserver(function(mutations, observer) {
//     // fired when a mutation occurs
//     console.log(mutations, observer);
//     const myroot = document.getElementById('root');
//     console.log("myroot",myroot);

//     ReactDOM.render(
//   <StripeProvider apiKey="pk_test_wRZncdxvPwvZgNqo09x4Gxbx">
//     <Provider store={store}>
//       <Router history={history}>
//         <div className="">
//           <Switch>
//             <Route path="/" exact component={ProfilesIndex} />
//             <Route path="/profiles/:id" exact component={BookingNew} />
//           </Switch>
//         </div>
//       </Router>
//     </Provider>
//   </StripeProvider>,
//   myroot
// );
//     // ...
// });

// // define what element should be observed by the observer
// // and what types of mutations trigger the callback
// observer.observe(document, {
//   attributes: true,
//   childList: true,
//   characterData: true,
//   subtree : true
// });

// render an instance of the component in the DOM
ReactDOM.render(
  <StripeProvider apiKey="pk_test_wRZncdxvPwvZgNqo09x4Gxbx">
    <Provider store={store}>
      <Router history={history}>
        <div className="">
          <Switch>
            <Route path="/" exact component={ProfilesIndex} />
            <Route path="/profiles/:id" exact component={BookingNew} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </StripeProvider>,
  myroot
);







