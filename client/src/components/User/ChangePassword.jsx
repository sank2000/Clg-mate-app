import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Spinner } from "react-bootstrap";
import { changePassword } from "../auth/RouteAccess";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../messages/alerts/alert';


import { useFormik } from "formik";
import * as Yup from "yup";

export default function ChangePassword() {
  const intialValues = {
    currentpassword: "",
    password: "",
    cpassword: ""
  };
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({
    content: "",
    type: "error"
  });
  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submit = async (user) => {
    setLoad(true);
    const res = await changePassword(user);
    setLoad(false);
    if (res.data.done) {
      setMsg({
        content: res.data.message,
        type: "success"
      });
      setOpen(true);
      setTimeout(() => {
        window.open("/profile", "_self");
      }, 3000);
    }
    else {
      setMsg({
        content: res.data.message,
        type: "error"
      });
      setOpen(true);
    }
  };

  const ValidationSchema = Yup.object({
    currentpassword: Yup.string()
      .required("Field required !")
      .min(5),
    password: Yup.string()
      .required("Field required !")
      .min(5),
    cpassword: Yup.string()
      .required("Field required !")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
  });

  const formik = useFormik({
    initialValues: intialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      submit(values);
    }
  });

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <h5>Change Password</h5>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column"
              justify="center"
              alignItems="center"
              spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="currenpassword"
                  {...formik.getFieldProps("currentpassword")}
                  helperText={
                    formik.touched.currentpassword &&
                    formik.errors.currentpassword
                  }
                  error={
                    formik.touched.currentpassword &&
                    formik.errors.currentpassword !== undefined
                  }
                  label="Current Password"
                  type="password"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  {...formik.getFieldProps("password")}
                  helperText={formik.touched.password && formik.errors.password}
                  error={
                    formik.touched.password &&
                    formik.errors.password !== undefined
                  }
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
                  error={
                    formik.touched.cpassword &&
                    formik.errors.cpassword !== undefined
                  }
                  label="Confirm Password"
                  type="password"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "dodgerblue",
                    color: "#fff",
                    // float: "right"
                  }}
                >
                  Confirm &nbsp;{load && <Spinner animation="border" size="sm" />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Snackbar open={open} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}
