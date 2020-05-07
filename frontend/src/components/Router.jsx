import React, { Fragment } from 'react';
import Upload from "./main/NewPost";
import App from "./main/App";
import SuccessMessage from "./messages/SuccessMessage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./messages/errors/404";

function MainApp() {
    return (
        <Fragment >
            <Router>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/newpost/success" exact component={SuccessMessage} ></Route>
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </Fragment>

    )
}


export default MainApp;
