import React from 'react';
import { Jumbotron, Button } from "react-bootstrap";
import { useHistory } from 'react-router';

function SuccessMessage() {
    const history = useHistory();
    return (
        <Jumbotron fluid>
            <h1>Post added</h1>
            <p>You cannot edit/ remove your post as of now. But this feature will be available soon.</p>
            <p>
                <Button onClick={() => {
                    history.push("/post");
                }} variant="primary">Go To Home</Button>
            </p>
        </Jumbotron>
    );
}

export default SuccessMessage;
