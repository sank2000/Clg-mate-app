import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "../../containers/FlexContainer";
import { resetPassword } from "../RouteAccess";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { useFormik } from "formik";
import * as Yup from "yup";


export default function Reset(props) {
  const [load, setLoad] = useState(false);

  const handleSend = async (values) => {
    setLoad(true);
    const res = await resetPassword({
      ...props.data,
      password: values.password
    });
    setLoad(false);
    if (res.data.changed) {
      props.setMsg({
        content: "Password Changed Successfully",
        type: "success"
      });
      props.setOpen(true);
      setTimeout(() => {
        window.open("/signin", "_self");
      }, 5000);
    }
    else {
      props.setMsg({
        content: "Unable to Change password",
        type: "error"
      });
      props.setOpen(true);
    }
  };

  const intialValues =
  {
    password: "",
    cpassword: "",
  }

  const ValidationSchema = Yup.object(
    {
      password: Yup.string().required('Field required !').min(5),
      cpassword: Yup.string().required('Field required !').oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

  const formik = useFormik(
    {
      initialValues: intialValues,
      validationSchema: ValidationSchema,
      onSubmit: values => {
        handleSend(values);
      }
    }
  )

  return (<Container>
    <img src='./images/lock.png' style={{ width: '10em', height: '10em', padding: '1rem' }} alt='' />
    <h2>Reset Password</h2>
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
          <Link to="/SignIn" className="linkStyle">
            <Button variant="contained" color="secondary" style={{ marginRight: "10px" }}>
              Go to Sign In
                    </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#2196f3", color: "#fff" }}
          >
            Confrim &nbsp;{load && <Spinner animation="border" size="sm" />}
          </Button>
        </Grid>
      </Grid>
    </form>
  </Container>
  )
}
