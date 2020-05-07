import React, { Fragment } from 'react';
import Upload from "./NewPost";
import App from "./App";
import SuccessMsg from "./SuccessMsg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoMatchPage from "./404";

function MainApp()
{
    return (
        <Fragment >
            <Router>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/newpost" exact component={Upload}></Route>
                    <Route path="/newpost/success" exact component={SuccessMsg} ></Route>
                    <Route component={NoMatchPage} />
                </Switch>
            </Router>
        </Fragment>

    )
}


export default MainApp;