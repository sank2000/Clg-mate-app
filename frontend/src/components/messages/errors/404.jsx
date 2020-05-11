import React, { Fragment } from 'react';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import Button from '@material-ui/core/Button';

const error5xx = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: "100vh",
    background: "#fff"
}

function Error404() {
    return (
        <Fragment>
            <div style={error5xx}>
                <div>
                    <span style={{ fontSize: "5rem" }}>4</span><LanguageOutlinedIcon style={{ fontSize: "4.2rem", color: "#ff1744", verticalAlign: "text-bottom" }} /><span style={{ fontSize: "5rem" }}>4</span>
                    <h1>PAGE DOES NOT EXIST</h1>
                    <p style={{ display: "block" }}>The page you're looking for does not exist.</p>
                    <Button onClick={() => {
                        window.open("/", "_self");
                    }}>GO HOME</Button>
                </div>
            </div>
        </Fragment>
    );
}

export default Error404;
