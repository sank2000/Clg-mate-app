import React, { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

import FlexContainer from '../containers/FlexContainer';

function SuccessMessage() {
    return (
        <Fragment>
            <FlexContainer>
                <CheckIcon style={{
                    fontSize: "5rem", color: "#009688"
                }} />
                <h1>SUCCESS!</h1>
                <p style={{ display: "block" }}>Operation successful.</p>
                <Button onClick={() => {
                    window.open("/", "_self");
                }}>GO HOME</Button>
            </FlexContainer>
        </Fragment>
    );
}


export default SuccessMessage;
