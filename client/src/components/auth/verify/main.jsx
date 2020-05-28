import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "../../containers/FlexContainer";
import { sendMail } from "../RouteAccess";
import { Spinner } from "react-bootstrap";
import Verify from "./verify";
import AuthApi from "../AuthApi";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../../messages/alerts/alert';

export default function () {
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;
  const [load, setLoad] = useState(false);
  const [send, setSend] = useState(false);
  const [Aopen, setAOpen] = useState(false);
  const [msg, setMsg] = useState({
    content: "Unable to Sned Mail",
    type: "error"
  });


  const data = { ...user, mailType: "verify", doc_id: user._id };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAOpen(false);
  };

  const handleSend = async () => {
    setLoad(true);
    const res = await sendMail(data);
    setLoad(false);
    if (res.data.done) {
      setSend(true);
    }
    else {
      setMsg({
        content: res.data.msg,
        type: "error"
      });
      setAOpen(true);
    }
  };

  return (
    <>
      {!send ? <Container>
        <img src='./images/confused.png' style={{ width: '10em', height: '10em', padding: '1rem' }} alt='' />
        <h4>Get verified at instance</h4>
        <p>Don't worry, let us help you to verify your account.</p>
        <Button variant="contained" color="secondary" style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSend}>
          Continue &nbsp;{load && <Spinner animation="border" size="sm" />}
        </Button>
      </Container> : <Verify setOpen={setAOpen} data={data} setMsg={setMsg} />
      }
      <Snackbar open={Aopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}
