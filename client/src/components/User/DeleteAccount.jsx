import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {deleteAccount} from "../auth/RouteAccess";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../messages/alerts/alert';
import { Spinner } from "react-bootstrap";
import AuthApi from "../auth/AuthApi";

export default function DeleteAccount() {
  const [agree, setAgree] = useState("");
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
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
    if (res.data.done) 
    {
        setMsg({
          content: res.data.message,
          type: "success"
        });
        setOpen(true);
        setTimeout(() =>
        {
          authApi.setAuth(false);
        },3000);
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
          <Grid item xs={12}>
            <h6>
              Type{" "}
              <span>
                <h5 style={{ display: "inline" }}>"I am Agree"</h5>
              </span>{" "}
              to continue
            </h6>
          </Grid>
          <Grid item xs={12}>
            <OutlinedInput onChange={e => setAgree(e.target.value)} />
          </Grid>
          {agree === "I am Agree" && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                style={{ float: "right" }}
                onClick={() => submit()}
              >
                Delete&nbsp;
              {load && <Spinner animation="border" size="sm" />}
              </Button>
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
