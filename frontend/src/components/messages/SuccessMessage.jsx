import React from 'react';
import { Jumbotron, Button } from "react-bootstrap";

function SuccessMessage() {
    return (
        <Jumbotron fluid>
            <h1>Post added</h1>
            <p>You cannot edit/ remove your post as of now. But this feature will be available soon.</p>
            <p>
                <Button onClick={() => {
                    window.open("/");
                }} variant="primary">Go To Home</Button>
            </p>
        </Jumbotron>
    );
}

export default SuccessMessage;
