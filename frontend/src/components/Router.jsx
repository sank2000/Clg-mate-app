import React, { Fragment, useState, useEffect } from 'react';
import App from "./main/App";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PageNotFound from "./messages/errors/404";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { hasSigned } from "./auth/RouteAccess"
import SuccessMessage from "./messages/SuccessMessage";

import AuthApi from "./auth/AuthApi";

function MainApp() {
  const [auth, setAuth] = useState(false);

  const readSession = async () => {
    const res = await hasSigned();
    if (res.data.auth) {
      setAuth(true);
    }
  }

  useEffect(() => {
    readSession();
  }, [])

  return (
    <Fragment >
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Switch>
            <RouteProtected path="/post" exact component={App} />
            <RouteProtected path="/" exact component={App} /> {/* It threw 404 on '/' */}
            <Route path="/newpost/success" exact component={SuccessMessage} />
            <RouteRegistration path="/signup" exact component={SignUp} />
            <RouteRegistration path="/signin" exact component={SignIn} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </AuthApi.Provider>
    </Fragment>
  );
}


const RouteRegistration = ({ component: Component, ...rest }) => {
  const AthApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        !AthApi.auth ? <Component {...props} /> : <Redirect to="/post" />
      }
    />
  );
}

const RouteProtected = ({ component: Component, ...rest }) => {
  const AthApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        AthApi.auth ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default MainApp;
