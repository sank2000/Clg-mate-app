import React, { useState, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";

import AuthApi from "../auth/AuthApi";

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
        <Link to="/posts/new">
          <Tooltip title="New Post" placement="left">
            <Fab elevation={3} style={{ position: "fixed", bottom: "13vh", right: "3vw" }} aria-label="add">
              <PostAddOutlinedIcon style={{ color: '#2196f3' }} />
            </Fab>
          </Tooltip>
        </Link>

        <Link to="/materials/new">
          <Tooltip title="New Material" placement="left">
            <Fab elevation={3} style={{ position: "fixed", bottom: "23vh", right: "3vw" }} aria-label="add">
              <LibraryAddOutlinedIcon style={{ color: '#2196f3' }} />
            </Fab>
          </Tooltip>
        </Link>
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