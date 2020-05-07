import React, { Fragment } from 'react';
import Upload from "./NewPost";
import App from "./App";
import SuccessMsg from "./SuccessMsg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function MainApp()
{
    return (
        <Fragment >
            <Router>
                <Route path="/" exact component={App}></Route>
                <Route path="/newpost" exact component={Upload}></Route>
                <Route path="/newpost/success" exact component={SuccessMsg} ></Route>
            </Router>
        </Fragment>

    )
}


export default MainApp;