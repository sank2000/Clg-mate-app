import React, { Fragment } from 'react';
import Upload from "./NewPost";
import App from "./App";
import SuccessMessage from "./messages/SuccessMessage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./errors/404";

function MainApp() {
    return (
        <Fragment >
            <Router>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/newpost" exact component={Upload}></Route>
                    <Route path="/newpost/success" exact component={SuccessMessage} ></Route>
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </Fragment>

    )
}


export default MainApp;
