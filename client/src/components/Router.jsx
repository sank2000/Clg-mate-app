import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./main/App";
import PageNotFound from "./messages/errors/404";
import SomethingWrong from "./messages/errors/5xx";
import SignUp from "./auth/SignUp/SignUp";
import SignIn from "./auth/SignIn";
import { hasSigned } from "./auth/RouteAccess"
import SuccessMessage from "./messages/SuccessMessage";
import AuthApi from "./auth/AuthApi";
import FullPost from "./main/FullPost";
import ExpiredPost from "./main/ExpiredPost";
import FullMaterial from "./main/FullMaterial";
import TimeTable from "./main/TimeTable";
import About from "./main/About";
import Forgot from "./auth/Forgot/ForgotPassword";
import FeedBack from "./forms/Feedback";
import UnderConstruction from './messages/UnderConstruction';
import UserDetails from "./User/main";
import Verify from "./auth/verify/main";
import FlexContainer from './containers/FlexContainer'

function Loading() {
  return (
    <FlexContainer>
      <CircularProgress style={{ color: "#2196f3" }} size={45} />
    </FlexContainer>
  );
}

function MainApp() {
  const [auth, setAuth] = useState(false);
  const [load, setLoad] = useState(true);

  const readSession = async () => {
    const res = await hasSigned();
    if (res.data.auth) {
      setAuth(res.data);
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
              <RouteProtected path="/fullpost" exact component={FullPost} />
              <RouteProtected path="/expiredpost" exact component={ExpiredPost} />
              <RouteProtected path="/fullmaterial" exact component={FullMaterial} />
              <RouteProtected path="/timetable" exact component={TimeTable} />
              <RouteProtected path="/feedback" exact component={FeedBack} />
              <RouteProtected path="/about" exact component={About} />
              <RouteProtected path="/profile" exact component={UserDetails} />
              <RouteProtected path="/verify" exact component={Verify} />

              <RouteRegistration path="/signup" exact component={SignUp} />
              <RouteRegistration path="/signin" exact component={SignIn} />
              <RouteRegistration path="/forgot" exact component={Forgot} />

              <Route path="/posts/new/success" exact component={SuccessMessage} />
              <Route path="/help" exact component={UnderConstruction} />
              <Route path="/oops" exact component={SomethingWrong} />
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
        !AthApi.auth.auth ? <Component {...props} /> : <Redirect to="/" />
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
        AthApi.auth.auth ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default MainApp;
