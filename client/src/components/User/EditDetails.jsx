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
import {updateAccount} from "../auth/RouteAccess";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../messages/alerts/alert';

export default function Detail(props) {
  const [show, setShow] = useState(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const intialValues = {
    name: props.user.name,
    url:  props.user.url,
    email: props.user.email
  };
  
  const submit = async (user) => {
    setLoad(true);
    const res = await updateAccount(user);
    setLoad(false);
    if (res.data.done) 
    {
        setMsg({
          content: res.data.message,
          type: "success"
        });
        setOpen(true);
        props.setUser({
          ...props.user,
          ...user
        });
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
      <Modal
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
              style={{ backgroundColor: "dodgerblue", color: "#fff" }}
            >
              submit &nbsp;
              {load && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}
