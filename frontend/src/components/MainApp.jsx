import React, { Fragment } from 'react';
import Upload from "./NewPost";
import App from "./App";
import SuccessMessage from "./SuccessMessage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoMatchPage from "./404";

function MainApp() {
    return (
        <Fragment >
            <Router>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/newpost" exact component={Upload}></Route>
                    <Route path="/newpost/success" exact component={SuccessMessage} ></Route>
                    <Route component={NoMatchPage} />
                </Switch>
            </Router>
        </Fragment>

    )
}


export default MainApp;
