import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import { Spinner } from "react-bootstrap";

import { signup } from "../RouteAccess";
import AuthApi from "../AuthApi";
import Alert from '../../messages/alerts/alert';


import { useFormik } from "formik";
import * as Yup from "yup";

function SignUpForm(props) {
  const authApi = React.useContext(AuthApi);

  const [load, setLoad] = useState(false);
  const [Aopen, setAOpen] = useState(false);
  const [msg, setMsg] = useState("");


  const AhandleClick = () => {
    setAOpen(true);
  };

  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAOpen(false);
  };


  const submit = async (user) => {
    setLoad(true);
    const res = await signup(user);
    if (res.data.auth) {
      authApi.setAuth(res.data);
    }
    else {
      setLoad(false);
      setMsg(res.data.message)
      AhandleClick();
    }
  };

  const intialValues = {
    name: "",
    unique_id: "",
    email: "",
    password: "",
    cpassword: "",
    type: props.user
  }

  const ValidationSchema = Yup.object({
    name: Yup.string().required("Field required !").min(3),
    email: Yup.string().required("Field required !").email("Invalid Email"),
    password: Yup.string().required('Field required !').matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, Letter, Number and Special Character"
    ),
    cpassword: Yup.string().required('Field required !').oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik(
    {
      initialValues: intialValues,
      validationSchema: ValidationSchema,
      validate: values => {
        let errors = {};
        if (!values.unique_id) {
          errors.unique_id = "Field Required";
        }
        else {
          if (props.user === "Student") {
            if (values.unique_id < 810018104001 || values.unique_id > 810018104999) {
              errors.unique_id = "ID Number Invalid";
            }
          }
        }
        return errors;
      },
      onSubmit: values => {
        submit(values);
      }
    }
  )

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="name"
            name="name"
            {...formik.getFieldProps("name")}
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && formik.errors.name !== undefined}
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="unique_id"
            name="unique_id"
            helperText={formik.touched.unique_id && formik.errors.unique_id}
            error={formik.touched.unique_id && formik.errors.unique_id !== undefined}
            {...formik.getFieldProps("unique_id")}
            variant="outlined"
            type="number"
            required
            fullWidth
            label={props.user + ' ID Number'}
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
            {...formik.getFieldProps("email")}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && formik.errors.email !== undefined}
            size="small"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            {...formik.getFieldProps("password")}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && formik.errors.password !== undefined}
            label="Password"
            type="password"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="cpassword"
            {...formik.getFieldProps("cpassword")}
            helperText={formik.touched.cpassword && formik.errors.cpassword}
            error={formik.touched.cpassword && formik.errors.cpassword !== undefined}
            label="Confirm Password"
            type="password"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#2196f3", color: "#fff" }}
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
      <Snackbar open={Aopen} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity="error">
          {msg}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default SignUpForm;
