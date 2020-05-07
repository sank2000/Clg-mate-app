import React, { Fragment } from 'react';
import { Jumbotron,Button } from "react-bootstrap";
import { useHistory } from 'react-router';

function Smsg()
{
    const history = useHistory();
    return <Jumbotron fluid>
        <h1>Successfully Post  Added</h1>
        <p>contact admin to remove Post</p>
        <p>
        <Button onClick={()=>
        {
            history.push("/");
        }} variant="primary">Go To Home</Button>
        </p>
    </Jumbotron>
}

export default Smsg;