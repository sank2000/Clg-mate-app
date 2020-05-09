import React from 'react';
import { Jumbotron, Button } from "react-bootstrap";

function Emsg() {
    return <Jumbotron fluid>
        <h1>404 Not found <span role="img" aria-label="emoji">🤔</span></h1>
        <p>oops something went wrong <span role="img" aria-label="emoji">😔</span></p>
        <p>
            <Button onClick={() => {
                window.open("/");
            }} variant="primary">Go To Home</Button>
        </p>
    </Jumbotron>
}

export default Emsg;
