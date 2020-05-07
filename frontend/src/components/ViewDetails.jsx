import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

function ViewDetails(props) {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      <Button size="medium" color="primary" onClick={() => setSmShow(true)}>SHOW DETAILS</Button>
      <Modal
        dialogClassName="modal-100w"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h1 style={{ display: "inline" }}>{props.data.title}</h1>
            <span className="close-btn" style={{ display: "inline", float: "right" }}>
              <IconButton variant="outlined"><CloseOutlinedIcon style={{ color: "#e53935" }} /></IconButton>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.data.dueDate}</p>
          <h3>{props.data.subName}</h3>
          <h4>{props.data.author}</h4>
          <p>{props.data.description}</p>
          <h5>{props.data.file}</h5>
          {props.data.url !== "" && <a href={props.data.url}><GetAppIcon className="DowIco" /></a>}
          <p>{props.data.type}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewDetails;
