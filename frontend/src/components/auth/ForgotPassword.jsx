import React, { useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "../containers/FlexContainer";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {checkId,sendMail} from "./RouteAccess";
import { Spinner } from "react-bootstrap";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [open, setOpen] = useState(false);
  const [found, SetFound] = useState(false);
  const [mail,setMail]   = useState("");
  const [msg, setMsg] = useState({
    content: "ID number Doesn't Exist",
    type: "error"
  });


  function Valid() {
    return (
      <Container>
        <h3>Your Mail id is {mail}</h3>
        <p> click below to sent password to your mail </p>
        <Button variant="contained" color="primary" onClick={handleSend}>
          Send&nbsp;{load2 && <Spinner animation="border" size="sm" />}
        </Button>
      </Container>
    );
  }

const handleSend = async() => {
    setLoad2(true);
    let idObj = { id : id};
    const res = await sendMail(idObj);
    setLoad2(false);
    if (res.data.done) 
    {
        setMsg({
            content: res.data.msg,
            type: "success"
        });
        setOpen(true);
    }
    else {
        setMsg({
            content: res.data.msg,
            type: "error"
        });
        setOpen(true);
    }
  };

  const handleClick = async() => {
    setLoad(true);
    let idObj = { id : id};
    const res = await checkId(idObj);
    setLoad(false);
    if (res.data.find) 
    {
        SetFound(true);
        setMail(res.data.mail);
    }
    else {
        setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleChange(event) {
    setId(event.target.value);
  }

  return (
    <Fragment>
      {!found && <Container>
        <h2>Enter your ID number</h2>
        <TextField
          autoComplete="unique_id"
          name="unique_id"
          variant="outlined"
          type="number"
          label="ID Number"
          autoFocus
          disabled={found}
          onChange={handleChange}
          style={{marginTop : "10px"}}
        />
        <br></br>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleClick}
          style={{marginTop : "10px"}}
        >
          ok&nbsp;{load && <Spinner animation="border" size="sm" />}
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={msg.type}>
            {msg.content}
          </Alert>
        </Snackbar>
      </Container>}
      {found && <Valid />}
    </Fragment>
  );
}
