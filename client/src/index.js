import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import  { AUTH_USER } from './actions/types';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';  
import RequireAuth from './components/auth/requireAuth';
import Welcome from './components/welcome';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store= createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token');

if(token){
  //update the app state before renders
  store.dispatch({ type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route  path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <route path='/feature' component={Feature} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
