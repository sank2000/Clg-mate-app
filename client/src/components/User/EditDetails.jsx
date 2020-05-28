import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateAccount } from "../auth/RouteAccess";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../messages/alerts/alert';
import AuthApi from "../auth/AuthApi";
import { signin } from "../auth/RouteAccess";

export default function Detail() {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [editModel, setEditModel] = useState(false);
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;
  const [msg, setMsg] = useState({
    content: "",
    type: "error"
  });

  const submitPassword = async () => {
    setLoad(true);
    const res = await signin({ unique_id: user.unique_id, password: password });
    setLoad(false);
    if (res.data.auth) {
      setEditModel(true);
    }
    else {
      setMsg({
        content: "Incorrect Password",
        type: "error"
      });
      setOpen(true);
    }
  }

  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const intialValues = {
    name: user.name,
    url: user.url,
    email: user.email
  };

  const submit = async (values) => {
    setLoad(true);
    const res = await updateAccount(values);
    setLoad(false);
    if (res.data.done) {
      setMsg({
        content: res.data.message,
        type: "success"
      });
      setOpen(true);
      authApi.setAuth({ ...user, ...values });
      handleClose();
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
    name: Yup.string()
      .required("Field required !")
      .min(3),
    email: Yup.string()
      .required("Field required !")
      .email("Invalid Email"),
    url: Yup.string().url()
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
      <IconButton
        style={{ float: "right", outline: "none" }}
        onClick={handleShow}
      >
        <EditOutlinedIcon />
      </IconButton>
      {editModel ? <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        dialogClassName="border-radius-1"
      >
        <Modal.Header>
          <h1 className="modal-title w-100 text-center">Edit</h1>
          <IconButton
            variant="outlined"
            onClick={handleClose}
            style={{ outline: "none" }}
          >
            <CloseOutlinedIcon style={{ color: "#ff1a1a" }} />
          </IconButton>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  {...formik.getFieldProps("name")}
                  helperText={formik.touched.name && formik.errors.name}
                  error={
                    formik.touched.name && formik.errors.name !== undefined
                  }
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
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
                  error={
                    formik.touched.email && formik.errors.email !== undefined
                  }
                  size="small"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="url"
                  helperText={formik.touched.url && formik.errors.url}
                  error={formik.touched.url && formik.errors.url !== undefined}
                  {...formik.getFieldProps("url")}
                  variant="outlined"
                  fullWidth
                  label="Image URL"
                />
              </Grid>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="outline-primary"
              style={{ backgroundColor: "#2196f3", color: "#fff" }}
            >
              submit &nbsp;
              {load && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </form>
      </Modal> : <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        dialogClassName="border-radius-1"
      >
          <Modal.Header>
            <h3 className="modal-title w-100 text-center">Confirm</h3>
            <IconButton
              variant="outlined"
              onClick={handleClose}
              style={{ outline: "none" }}
            >
              <CloseOutlinedIcon style={{ color: "#ff1a1a" }} />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <h5>Enter your password to continue :</h5>
            <TextField
              name="password"
              variant="outlined"
              type="password"
              fullWidth
              id="name"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={submitPassword}
              variant="outline-primary"
              style={{ backgroundColor: "#2196f3", color: "#fff" }}
            >
              submit &nbsp;
              {load && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>}
      <Snackbar open={open} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}
