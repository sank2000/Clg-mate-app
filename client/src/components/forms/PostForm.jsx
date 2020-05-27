import React, { useState } from "react";
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
import Grid from '@material-ui/core/Grid';

import subjects from '../../constants/subjects'

function renderSubjects(subject) {
  return (
    <MenuItem key={subject.code} value={subject.name}>{`${subject.code} - ${subject.name}`}</MenuItem>
  );
}

function PostForm(props) {
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  
  const handlePostTypeChange = event => {
    setType(event.target.value);
  };

  const handleSubjectChange = event => {
    setSubject(event.target.value);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.open("/", "_top");
  };

  const handleShow = () => setShow(true);
  const applyMargin = {
    margin: "7px"
  };

  useState(() => {
    handleShow();
  }, [])

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="border-radius-1" >
      <Modal.Header>
        <h1 className="modal-title w-100 text-center">New Post</h1>
        <IconButton variant="outlined" onClick={handleClose} style={{ outline: "none" }}><CloseOutlinedIcon style={{ color: '#ff1a1a' }} /></IconButton>
      </Modal.Header>
      <Modal.Body>
        <div className="uploadForm">
          <form action="/posts/new" method="post">
            <TextField style={applyMargin}
              variant="outlined"
              required type="text"
              name="title"
              fullWidth
              label="Title" />
            <Grid container spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" style={applyMargin} size="small" fullWidth >
                  <InputLabel>
                    Subject
                  </InputLabel>
                  <Select
                    name="subName"
                    required
                    value={subject}
                    onChange={handleSubjectChange}
                    label="Subject"
                  >
                    <MenuItem disabled={true} value="">Select a Subject</MenuItem>
                    {subjects.map(renderSubjects)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" style={applyMargin} size="small" fullWidth >
                  <InputLabel>
                    Post Type
                  </InputLabel>
                  <Select
                    name="postType"
                    required
                    value={type}
                    onChange={handlePostTypeChange}
                    label="Post Type"
                  >
                    <MenuItem disabled={true} value="">Select a type</MenuItem>
                    <MenuItem value={"Assignment"}>Assignment</MenuItem>
                    <MenuItem value={"Announcement"}>Announcement</MenuItem>
                    <MenuItem value={"Home work"}>Home work</MenuItem>
                    <MenuItem value={"Instruction"}>Instruction</MenuItem>
                    <MenuItem value={"Test"}>Test</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField style={applyMargin}
              variant="outlined"
              required
              name="description"
              rows={4}
              fullWidth
              multiline
              label="Description" />
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
                size="small"
                variant="inline"
                inputVariant="outlined"
                name="dueDate"
                label="Due Date"
                format="dd-MMM-yyyy"
                value={selectedDate}
                minDate={new Date()}
                onChange={date => handleDateChange(date)}
                style={{ ...applyMargin, outline: "none" }}
              />
            </MuiPickersUtilsProvider>
            <div className="file-section" style={applyMargin}>
              <input type="hidden" name="url" value={JSON.stringify(props.url)} />
              <input
                style={{ display: "none" }}
                type="file"
                id="contained-button-file"
                name="file"
                accept="image/*, .pdf, .xls, .doc, .odt"
                multiple
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
                style={{ float: "right", marginRight: "-15px" }}>
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
  );
}

export default PostForm;
