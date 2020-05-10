import React, { Fragment, useState, useEffect } from 'react';
import App from "./main/App";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PageNotFound from "./messages/errors/404";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { hasSigned } from "./auth/RouteAccess"
import SuccessMessage from "./messages/SuccessMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthApi from "./auth/AuthApi";
import NewPost from "./dialogs/NewPost";
import FullPost from "./main/FullPost";

function Loading() {
  return (<div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }}>
    <CircularProgress style={{ color: "dodgerblue" }} size={46} />
  </div >
  );
}

function MainApp() {
  const [auth, setAuth] = useState(false);
  const [load, setLoad] = useState(true);

  const readSession = async () => {
    const res = await hasSigned();
    if (res.data.auth) {
      setAuth(true);
    }
    setLoad(false);
  }

  useEffect(() => {
    readSession();
  }, []);

  function Main() {
    return (
      <Fragment >
        <AuthApi.Provider value={{ auth, setAuth }}>
          <Router>
            <Switch>
              <RouteProtected path="/" exact component={App} />
              <RouteProtected path="/newpost" exact component={NewPost} />
              <RouteProtected path="/fullpost" exact component={FullPost} />
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



  return (
    <Fragment>
      {load ? <Loading /> : <Main />}
    </Fragment>
  );
}


const RouteRegistration = ({ component: Component, ...rest }) => {
  const AthApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        !AthApi.auth ? <Component {...props} /> : <Redirect to="/" />
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
