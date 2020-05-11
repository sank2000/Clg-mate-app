import React, { Fragment } from 'react';
import ClearIcon from '@material-ui/icons/Clear';

const error5xx = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  height: "100vh",
  background: "#fff"
}

function SomethingWrong() {
  return (
    <Fragment>
      <div style={error5xx}>
        <div>
          <ClearIcon style={{ fontSize: "5rem", color: "red" }} />
          <h1>Something went wrong!</h1>
          <p style={{ display: "block" }}>Something went wrong while performing the operation, report the bug so that we can fix it.</p>
        </div>
      </div>
    </Fragment>
  );
}

export default SomethingWrong;
