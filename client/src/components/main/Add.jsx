import React, { useState, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";

import AuthApi from "../auth/AuthApi";
import Form from "../dialogs/NewPost";


export default function () {
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;

  function handleClick() {
    if (user.state !== "verified") {
      setLoading(true);
    }
    else {
      setClick(!click);
    }

  }

  return (
    <>
      {click && <Fragment>
        <Form post />
        <Form />
      </Fragment>}
      <Fab elevation={3} onClick={handleClick} style={{ position: "fixed", bottom: "3vh", right: "3vw" }} aria-label="add">
        {click ? <ClearIcon style={{ color: '#2196f3' }} /> : <AddIcon style={{ color: '#2196f3' }} />}
      </Fab>
      <Backdrop style={{ zIndex: "20000" }} open={loading}>
        <Alert
          onClose={() => {
            setLoading(false);
          }}
          variant="filled"
          severity="error"
          style={{ zIndex: "50000" }}
        >
          In order to access this you need to get verified &nbsp; — &nbsp; <a href="/verify">verify now</a>
        </Alert>
      </Backdrop>
    </>
  )
}