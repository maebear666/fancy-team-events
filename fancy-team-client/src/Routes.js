import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './App';

import Login from './components/Login/view'
import Profile from './components/Profile/view';
import Event from './components/Event/event';
import Handle404 from './components/404/view';
import { Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import config from './config';
import store from './Redux/store';

function Routes(){
    return (
        <Provider store={store}>
          <Router>
              <Security
                  issuer={config.oidc.issuer}
                  client_id={config.oidc.clientId}
                  redirect_uri={config.oidc.redirectUri}
              >

              <Route exact path='/' component={ App } />
              <Route exact path='/login' component={ Login } />
              <Route path="/implicit/callback" component={ ImplicitCallback } />
              <SecureRoute path="/profile" component= { Profile } />
              <SecureRoute path="/event" component= { Event } />
              <Route component={ Handle404 } />
              </Security>
          </Router>
        </Provider>
    )
}

export default Routes;
