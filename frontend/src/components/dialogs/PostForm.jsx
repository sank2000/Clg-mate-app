import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Btn from "@material-ui/core/Button";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function PostForm(props) {
  const [type, setType] = useState("Other");
  const [selectedDate, handleDateChange] = useState(new Date());
  const handleChange = event => {
    setType(event.target.value);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const applyMargin = {
    margin: "7px"
  };


  return (
    <>
      {/* <Button className="newPost" variant="outline-info" onClick={handleShow}>
        New Post
      </Button> */}
      <Fab color="primary" style={{ position: "fixed", bottom: "3vh", right: "3vw" }} onClick={handleShow} aria-label="add">
        <AddIcon />
      </Fab>
      <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="border-radius-1" >
        <Modal.Header> {/* Remove this default close button and add custom one */}
          <h1 className="modal-title w-100 text-center">New Post</h1>
          <IconButton variant="outlined" onClick={handleClose} style={{ outline: "none" }}><CloseOutlinedIcon style={{ color: "#e53935" }} /></IconButton>
        </Modal.Header>
        <Modal.Body>
          <div className="uploadForm">
            <form action="/newpost" method="post">
              <TextField style={applyMargin}
                variant="outlined"
                required type="text"
                name="title"
                fullWidth
                label="Title" />
              <FormControl variant="outlined" style={applyMargin} fullWidth>
                <InputLabel>
                  Post Type
                  </InputLabel>
                <Select
                  name="postType"
                  value={type}
                  onChange={handleChange}
                  label="Post Type"
                >
                  <MenuItem value={"Other"}>Other</MenuItem>
                  <MenuItem value={"Notes"}>Notes</MenuItem>
                  <MenuItem value={"Assignment"}>Assignment</MenuItem>
                </Select>
              </FormControl>
              <TextField style={applyMargin}
                variant="outlined"
                required
                name="description"
                rows={4}
                fullWidth
                multiline
                label="Description" />
              <TextField style={applyMargin}
                variant="outlined"
                required
                type="text"
                name="subName"
                label="Subject"
                className="halfWidth"
                size="small"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                  size="small"
                  variant="inline"
                  inputVariant="outlined"
                  name="dueDate"
                  label="Due Date"
                  format="yyyy/MM/dd"
                  value={selectedDate}
                  onChange={date => handleDateChange(date)}
                  style={{ ...applyMargin, outline: "none" }}
                />
              </MuiPickersUtilsProvider>
              <div className="file-section" style={applyMargin}>
                <input type="hidden" name="url" value={props.url} />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="contained-button-file"
                  name="file"
                  onChange={props.handleChange}
                />
                <label htmlFor="contained-button-file">
                  <Btn variant="contained" component="span" disableElevation>
                    {props.fileChooseState}
                  </Btn>
                </label>
                <Btn
                  onClick={props.handleUpload}
                  size="medium"
                  variant="contained"
                  color="secondary"
                  style={{ float: "right" }}>
                  <CloudUploadOutlinedIcon
                    fontSize="small"
                    className="uploadIcon" />
                &nbsp; {props.progress}
                </Btn>
              </div>
              <Btn style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Btn>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostForm;
