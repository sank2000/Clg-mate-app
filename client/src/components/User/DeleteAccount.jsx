import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { deleteAccount } from "../auth/RouteAccess";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../messages/alerts/alert';
import { Spinner } from "react-bootstrap";
import AuthApi from "../auth/AuthApi";

export default function DeleteAccount() {
  const [agree, setAgree] = useState("");
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [cOpen, setCOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleConfirmOpen = () => {
    setCOpen(true);
  };

  const handleConfirmClose = () => {
    setCOpen(false);
  };

  const [msg, setMsg] = useState({
    content: "",
    type: "error"
  });
  const authApi = React.useContext(AuthApi);
  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submit = async () => {
    setLoad(true);
    const res = await deleteAccount();
    setLoad(false);
    if (res.data.done) {
      setMsg({
        content: res.data.message,
        type: "success"
      });
      setOpen(true);
      setTimeout(() => {
        authApi.setAuth({ auth: false });
      }, 3000);
    }
    else {
      setMsg({
        content: res.data.message,
        type: "error"
      });
      setOpen(true);
    }
  };

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <h5>Delete Account</h5>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={1}>
            <Grid item>
              <h6>
                Type{" "}
                <span>
                  <h5 style={{ display: "inline" }}>"I agree"</h5>
                </span>{" "}
              to continue
            </h6>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput onChange={e => setAgree(e.target.value)} />
            </Grid>
            {agree === "I agree" && (
              <Grid item xs={12}>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ float: "right" }}
                    onClick={handleConfirmOpen}
                  > <DeleteForeverOutlinedIcon />
                  Delete
                  </Button>
                  <Dialog
                    open={cOpen}
                    onClose={handleConfirmClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullScreen={fullScreen}
                  >
                    <DialogTitle id="alert-dialog-title">{"Do you really want to delete your account?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This will remove your account and credentials, including verified email address, DP etc. Any posts or materials you created will not be removed. You can always create a new account using the same ID number and email ID.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleConfirmClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => submit()} color="secondary" autoFocus>
                        Yes &nbsp;
                  {load && <Spinner animation="grow" variant="danger" size="sm" />}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
            )}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Snackbar open={open} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}
