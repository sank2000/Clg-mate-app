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

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';

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

function SignUpForm(props) {
  const authApi = React.useContext(AuthApi);
  const [user, setUser] = useState({
    name: "",
    section: "",
    regNo: "",
    email: "",
    password: "",
    type: props.user
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
    (cpassword === user.password) ? console.log('Handle err') : console.log('Handle crct')
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="idNumber"
            name="idNumber"
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: { min: (props.user === 'Student') && 810018104001, max: (props.user === 'Student') && 810018104999 }
            }}
            defaultValue={props.user === 'Student' && 810018104001}
            required
            fullWidth
            label={props.user + ' ID Number'}
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
          <Link href="/SignIn" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>);
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

function SignUpSwitch() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" elevation={0} color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Student" icon={<LocalLibraryOutlinedIcon />} />
          <Tab label="Staff" icon={<HowToRegOutlinedIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SignUpForm user='Student' />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUpForm user='Staff' />
      </TabPanel>
    </div>
  );
}


function SignUp() {
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
            <SignUpSwitch />
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
