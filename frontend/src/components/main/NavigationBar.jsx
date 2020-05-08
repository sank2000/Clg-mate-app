import React from 'react';
import Upload from "./NewPost";
import {signout} from "../auth/RouteAccess";
import { Button } from "react-bootstrap";
import AuthApi from "../auth/AuthApi";

function Nav() {
    const authApi = React.useContext(AuthApi);
    const handle = async () =>
    {
        await signout();
        authApi.setAuth(false);
    }

    return (
        <header>
            <h1>Collegemate alpha</h1>
            <Upload />
            <Button className="newPost logout" variant="outline-danger" onClick={handle}>logout</Button>
        </header>

    )
}

export default Nav;
