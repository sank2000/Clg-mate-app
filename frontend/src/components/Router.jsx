import React, { Fragment } from 'react';
import Upload from "./main/NewPost";
import App from "./main/App";
import SuccessMessage from "./messages/SuccessMessage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./messages/errors/404";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
function MainApp() {
    return (
        <Fragment >
            <Router>
                <Switch>
                    <Route path="/post" exact component={App}></Route>
                    <Route path="/SignUp" exact component={SignUp} ></Route>
                    <Route path="/SignIn" exact component={SignIn} ></Route>
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </Fragment>

    )
}


export default MainApp;
