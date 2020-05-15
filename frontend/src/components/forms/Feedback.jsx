import React, { useState, Fragment } from "react";
import FlexContainer from "../containers/FlexContainer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Spinner } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import NavigationBar from "../navigation/AppBar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [bdy, setBdy] = useState({
    title: "",
    content: ""
  });
  const [msg, setMsg] = useState({
    content: "",
    type: "error"
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setBdy(old => {
      return {
        ...old,
        [name]: value
      };
    });
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function submit() {
    setLoad(true);
    if (msg.title == "" || msg.content == "") {
      setMsg({
        content: "Plz fill all the fields",
        type: "error"
      });
      setOpen(true);
      setLoad(false);
      return;
    }
    let prms = new URLSearchParams(bdy);
    axios.post("/mail/feedback", prms)
      .then(function (response) {
        if (response.data.done) {
          setMsg({
            content: response.data.msg,
            type: "success"
          });
          setOpen(true);
          setLoad(false);
        }
        else {
          setMsg({
            content: response.data.msg,
            type: "error"
          });
          setOpen(true);
          setLoad(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoad(false);
        //window.open("/oops", "_self");
      });
  }

  let marginstyle = {
    marginTop: "5px",
    marginBottom: "5px"
  };

  return (
    <Fragment>
      <NavigationBar />
      <FlexContainer height='89vh' background='transparent' className="App">
        <CreateOutlinedIcon style={{
          padding: "1rem",
          background: "dodgerblue",
          borderRadius: "50%",
          color: "#fff",
          fontSize: "3.5rem",
          margin: '1rem'
        }} />
        <h2>Feel free to send feedback to us!</h2>
        <TextField
          id="outlined-basic"
          fullWidth
          label="Subject"
          name="title"
          variant="outlined"
          onChange={handleChange}
          style={marginstyle}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          fullWidth
          name="content"
          rows={4}
          variant="outlined"
          onChange={handleChange}
          style={marginstyle}
        />
        <Button
          variant="contained"
          onClick={submit}
          color="primary"
          style={marginstyle}
        >
          Submit&nbsp;{load && <Spinner animation="border" size="sm" />}
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={msg.type}>
            {msg.content}
          </Alert>
        </Snackbar>
      </FlexContainer>
    </Fragment>
  );
}
