import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { signup } from "./RouteAccess";
import AuthApi from "./AuthApi";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Collegemate
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignUp() {
  const authApi = React.useContext(AuthApi);
  const [user, setUser] = useState({
    name: "",
    regNo: "",
    email: "",
    password: "",
  }
  );
  const [load, setLoad] = useState(false);

  function handleChange(event) {
    const { value, name } = event.target;
    setUser((old) => {
      return {
        ...old,
        [name]: value
      }
    });
  }

  function confirmPassword(cPass) {
    //TODO: write code to manage confirm password
    const cpassword = cPass.target;
    (cpassword == user.password) ? console.log('Handle err') : console.log('Handle crct')
  }

  const submit = async (e) => {
    setLoad(true);
    e.preventDefault();
    const res = await signup(user);
    if (res.data.auth) {
      authApi.setAuth(true);
    }
  };

  return (
    <>
      <div
        className="outer-container"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          height: "100vh",
          background: "#fff"
        }}
      >
        <div
          className="inner-container"
          style={{
            display: "block",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Container component="main" spacing={2} maxWidth="xs">
            <LockOutlinedIcon
              style={{
                padding: "10px",
                background: "dodgerblue",
                borderRadius: "50%",
                color: "#fff",
                fontSize: "3rem"
              }}
            />
            <Typography style={{ margin: "10px" }} component="h1" variant="h4">
              Sign Up
            </Typography>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="registerNumber"
                    name="registerNumber"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      inputProps: { min: 810018104001, max: 810018104999 }
                    }}
                    required
                    fullWidth
                    label="Register Number"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    size="small"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    size="small"
                    onChange={confirmPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "dodgerblue", color: "#fff" }}
                    onClick={submit}
                  >
                    Sign Up &nbsp;{load && <Spinner animation="border" size="sm" />}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Container>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </div>
    </>
  );
}

export default SignUp;
