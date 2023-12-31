import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';
import Home from './Home';


const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('Sign in error:', err);
  };

  if (!authState) {
    return <div>Loading ... </div>;
  }

  return authState.isAuthenticated 
   ?<Redirect to={{ pathname: '/login/project-board' }}/> :
  //  <Redirect to={{ pathname: '/login' }}/> :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;
};

export default Login;
