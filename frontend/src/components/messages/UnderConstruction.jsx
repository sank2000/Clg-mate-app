import React, { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import NavBar from '../navigation/AppBar';

import FlexContainer from '../containers/FlexContainer';

function MenAtWork() {
    return (
        <Fragment>
            <NavBar />
            <FlexContainer height='90vh'>
                <img src='./images/people.png' style={{ width: '10em', height: '10em', padding: '1rem' }} alt='' />
                <h1>MEN AT WORK!</h1>
                <p style={{ display: "block" }}>This page is still under construction, visit later.</p>
                <Button onClick={() => {
                    window.open("/", "_self");
                }}>GO HOME</Button>
            </FlexContainer>
        </Fragment>
    );
}


export default MenAtWork;
