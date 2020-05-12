import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Btn from "@material-ui/core/Button";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';


function PostForm(props) {
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
    <>
      <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="border-radius-1" >
        <Modal.Header> {/* Remove this default close button and add custom one */}
          <h1 className="modal-title w-100 text-center">New Material</h1>
          <IconButton variant="outlined" onClick={handleClose} style={{ outline: "none" }}><CloseOutlinedIcon style={{ color: '#ff1a1a' }} /></IconButton>
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
              <TextField style={applyMargin}
                variant="outlined"
                required type="text"
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
              <TextField style={applyMargin}
                variant="outlined"
                required
                type="text"
                name="subName"
                label="Sub Name"
                className="halfWidth"
                size="small"
              />
              <TextField style={applyMargin}
                variant="outlined"
                required
                type="text"
                name="subCode"
                label="Sub Code"
                className="halfWidth"
                size="small"
              />
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
                {props.fileChooseState === 'File Choosen' &&
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
                }
              </div>
              {'Uploaded' === props.progress &&
                <Btn style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Btn>
              }
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostForm;
