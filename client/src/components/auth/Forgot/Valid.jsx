import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "../../containers/FlexContainer";
import { verifyOTP } from "../RouteAccess";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Valid(props) {
  const [otp, setOtp] = useState("");
  const [load, setLoad] = useState(false);

  const handleSend = async () => {
    setLoad(true);
    const res = await verifyOTP({
      ...props.data,
      OTP: otp
    });
    setLoad(false);
    if (res.data.verified) {
      props.SetFound(3);
    }
    else {
      props.setMsg({
        content: "Wrong OTP",
        type: "error"
      });
      props.setOpen(true);
    }
  };

  return (
    <Container maxWidth="xl">
      <img src='./images/mail.png' style={{ width: '10em', height: '10em', padding: '1rem' }} alt='' />
      <h4>Check your Email!</h4>
      <p>We've sent you an email. Copy the OTP from there.</p>
      <TextField
        name="otp"
        variant="outlined"
        type="number"
        label="OTP"
        autoFocus
        onChange={(event) => setOtp(event.target.value)}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      /><br></br>
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
