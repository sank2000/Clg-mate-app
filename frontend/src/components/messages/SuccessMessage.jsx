import React, { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

const error5xx = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: "100vh",
    background: "#fff"
}

function SuccessMessage() {
    return (
        <Fragment>
            <div style={error5xx}>
                <div>
                    <CheckIcon style={{
                        fontSize: "5rem", color: "#009688"
                    }} />
                    <h1>SUCCESS!</h1>
                    <p style={{ display: "block" }}>Operation successful.</p>
                    <Button onClick={() => {
                        window.open("/", "_self");
                    }}>GO HOME</Button>
                </div>
            </div>
        </Fragment>
    );
}


export default SuccessMessage;
