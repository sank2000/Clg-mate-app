import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Btn from "@material-ui/core/Button";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';

import subjects from '../../constants/subjects'

function renderSubjects(subject) {
  return (
    <MenuItem key={subject.code} value={subject.name}>
      {`${subject.code} - ${subject.name}`}
    </MenuItem>
  );
}

function PostForm(props) {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [subject, setSubject] = useState('');
  const handleMaterialTypeChange = event => {
    setType(event.target.value);
  };

  const handleSubjectChange = event => {
    setSubject(event.target.value);
  };

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
  })

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="border-radius-1" >
      <Modal.Header>
        <h1 className="modal-title w-100 text-center">New Material</h1>
        <IconButton variant="outlined" onClick={handleClose} style={{ outline: "none" }}>
          <CloseOutlinedIcon style={{ color: '#ff1a1a' }} />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <div className="uploadForm">
          <form method="post" action="/materials/new">
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
                    <MenuItem disabled={true} value=''>Select a Subject</MenuItem>
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
                    name="materialType"
                    required
                    value={type}
                    onChange={handleMaterialTypeChange}
                    label="Post Type"
                  >
                    <MenuItem disabled={true} value="">Select a type</MenuItem>
                    <MenuItem value={"Book"}>Book</MenuItem>
                    <MenuItem value={"Form"}>Form</MenuItem>
                    <MenuItem value={"Question Bank"}>Question Bank</MenuItem>
                    <MenuItem value={"Question Paper"}>Question Paper</MenuItem>
                    <MenuItem value={"Notes"}>Notes</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField style={applyMargin}
              variant="outlined"
              type="text"
              name="author"
              fullWidth
              label="Author" />
            <TextField style={applyMargin}
              variant="outlined"
              required
              name="description"
              rows={4}
              fullWidth
              multiline
              label="Description" />
            <div className="file-section" style={applyMargin}>
              <input type="hidden" name="url" value={props.url} />
              <input
                required
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
              {props.fileChooseState === 'File Chosen' &&
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
              }
            </div>
            {
              'Uploaded' === props.progress &&
              <Btn style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Btn>
            }
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PostForm;
