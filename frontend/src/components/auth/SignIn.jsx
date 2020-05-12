import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { signin } from "./RouteAccess"
import AuthApi from "./AuthApi";
import Alert from '../messages/alerts/alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" color="inherit" href="*">
        Collegemate
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ContainerStyle = {
  backgroundColor: "white",
  borderRadius: "1rem"
}

function SignIn() {
  const authApi = React.useContext(AuthApi);
  const classes = useStyles();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [load, setLoad] = useState(false);
  const [Aopen, setAOpen] = useState(false);
  const [PassValues, setPassValues] = useState({
    password: "",
    showPassword: false
  });

  const PassHandleChange = prop => event => {
    setPassValues({ ...PassValues, [prop]: event.target.value });
    handleChange(event);
  };

  const handleClickShowPassword = () => {
    setPassValues({ ...PassValues, showPassword: !PassValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const AhandleClick = () => {
    setAOpen(true);
  };

  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAOpen(false);
  };

  function handleChange(event) {
    const { value, name } = event.target;
    setUser((old) => {
      return {
        ...old,
        [name]: value
      }
    });
  }

  const submit = async (e) => {
    setLoad(true);
    e.preventDefault();
    const res = await signin(user);
    if (res.data.auth) {
      authApi.setAuth(true);
    }
    else {
      setLoad(false);
      AhandleClick();
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={ContainerStyle}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="User Name"
            name="username"
            autoFocus
            onChange={handleChange}
          />


          <FormControl variant="outlined" fullWidth required={true} >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
          </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={PassValues.showPassword ? "text" : "password"}
              value={PassValues.password}
              fullWidth
              name="password"
              onChange={PassHandleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {PassValues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Sign In &nbsp;{load && <Spinner animation="border" size="sm" />}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={Aopen} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity="error">
          User Name or Password is Invalid!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignIn;
