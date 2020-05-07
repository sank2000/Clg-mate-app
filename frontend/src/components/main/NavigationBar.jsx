import React from 'react';
import Upload from "./NewPost";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function nav() {
    return (
        <header>
            <h1>Collegemate alpha</h1>
            {/* <Upload /> */}
            <Link to="/newpost">
                <Button className="newPost" variant="outline-info">
                    New Post
                </Button>
            </Link>
        </header>

    )
}

export default nav;
