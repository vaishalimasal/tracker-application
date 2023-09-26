import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
// import Home from "./Home";
import Login from "./Login";
// import Protected from "./Protected";
import config from "./config";
// import Navbar from "./components/Nabbar";
// import Sidebar from "./components/Sidebar";
import "./App.css";
import Dashboard from "./components/Dashboard";





const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "", window.location.origin));
  };

  return (
    <div className="App">
      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={customAuthHandler}
        restoreOriginalUri={restoreOriginalUri}
      >
     {/* <Sidebar/>  */}
          {/* <Navbar/> */}
        <Route path="/" exact component={Login} />
        {/* <SecureRoute path="/protected" component={Protected} /> */}
        <SecureRoute path="/login" render={() => <Dashboard/>} />
        <Route path="/login/callback" component={LoginCallback} />
     
      </Security>
    </div>
  );
};

export default App;
