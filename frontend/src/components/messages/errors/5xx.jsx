import React, { Fragment } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

import FlexContainer from '../../containers/FlexContainer';

function SomethingWrong() {
  return (
    <Fragment>
      <FlexContainer>
        <ClearIcon style={{ fontSize: "5rem", color: '#ff1a1a' }} />
        <h1>Something went wrong!</h1>
        <p style={{ display: "block" }}>An internal error occurred while performing the operation, please report the bug so that we can fix it.</p>
        <Button onClick={() => {
          window.open("/", "_self");
        }}>GO HOME</Button>
        <Button style={{ color: '#3399ff' }} onClick={() => {
          window.open("/report", "_self");
        }} autoFocus>Report Bug</Button>
      </FlexContainer>
    </Fragment>
  );
}

export default SomethingWrong;
