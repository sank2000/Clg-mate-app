import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "../../containers/FlexContainer";
import { sendMail } from "../RouteAccess";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Valid(props) {
  const [load, setLoad] = useState(false);

  const handleSend = async () => {
    setLoad(true);
    const res = await sendMail(props.data);
    setLoad(false);
    if (res.data.done) {
      props.SetFound(2);
    }
    else {
      props.setMsg({
        content: res.data.msg,
        type: "error"
      });
      props.setOpen(true);
    }
  };

  return (
    <Container>
      <img src='./images/confused.png' style={{ width: '10em', height: '10em', padding: '1rem' }} alt='' />
      <h4>Oops! You forgot your password?</h4>
      <p>Don't worry, let us help you reset your password.</p>
      <Link to="/SignIn" className="linkStyle">
        <Button variant="contained" color="secondary" style={{ marginRight: "10px" }}>
          Go to Sign In
          </Button>
      </Link>
      <Button variant="contained" color="primary" onClick={handleSend}>
        Continue &nbsp;{load && <Spinner animation="border" size="sm" />}
      </Button>
    </Container>
  );
}
