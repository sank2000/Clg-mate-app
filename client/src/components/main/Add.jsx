import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState, Fragment } from 'react';

import Alert from "@material-ui/lab/Alert";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";

import AuthApi from "../auth/AuthApi";
import Form from "../forms/NewPostHandler";

export default function () {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openForm = formType => {
    if (user.state !== "verified") { setLoading(true); return; }
    setType(formType);
    setOpen(false);
  }

  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      transform: "translateZ(0px)",
      flexGrow: 1
    },
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      height: null
    }
  });

  const classes = useStyles();

  return (
    <>
      {
        <Fragment>
          <div className={classes.root}>
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              className={classes.speedDial}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
              <SpeedDialAction
                icon={<LibraryAddOutlinedIcon />}
                tooltipTitle={"Post"}
                tooltipOpen
                style={{ color: 'blue' }}
                onClick={() => openForm('post')}
              />
              <SpeedDialAction
                icon={<PostAddOutlinedIcon />}
                tooltipTitle={"Material"}
                tooltipOpen
                style={{ color: 'blue' }}
                onClick={() => openForm('material')}
              />
            </SpeedDial>
          </div>
          {
            type === 'post' && <Form post />
          }
          {
            type === 'material' && <Form />
          }
        </Fragment>
      }
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
