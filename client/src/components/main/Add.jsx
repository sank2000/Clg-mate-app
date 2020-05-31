import React, { useState, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import Tooltip from '@material-ui/core/Tooltip';
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";

import AuthApi from "../auth/AuthApi";
import Form from "../dialogs/NewPost";


export default function () {
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;

  function handleClick() {
    setType("");
    if (user.state !== "verified") {
      setLoading(true);
    }
    else {
      setClick(!click);
    }
  }

  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.shadows[3],
      color: '#fff',
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.shadows[6],
      },
      "&:clicked": {
        boxShadow: theme.shadows[3],
      }
    },
  });

  const classes = useStyles();

  return (
    <>
      {click && <Fragment>
        <Tooltip title="New Post" placement="left">
          <Fab elevation={3} className={classes.newButton} style={{ position: "fixed", bottom: "13vh", right: "3vw" }} aria-label="add" onClick={() => setType('post')}>
            <PostAddOutlinedIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="New Material" placement="left">
          <Fab elevation={3} className={classes.newButton} style={{ position: "fixed", bottom: "23vh", right: "3vw" }} aria-label="add" onClick={() => setType('material')}>
            <LibraryAddOutlinedIcon />
          </Fab>
        </Tooltip>
        {
          type === 'post' && <Form post />
        }
        {
          type === 'material' && <Form />
        }
      </Fragment>}
      <Fab elevation={3} onClick={handleClick} className={classes.root} style={{ position: "fixed", bottom: "3vh", right: "3vw" }} aria-label="add">
        {click ? <ClearIcon /> : <AddIcon />}
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
          In order to access this you need to get verified &nbsp; — &nbsp; <a href="/verify">Verify now</a>
        </Alert>
      </Backdrop>
    </>
  )
}
