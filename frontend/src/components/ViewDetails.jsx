import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import GetAppIcon from '@material-ui/icons/GetApp';
import Btn from "@material-ui/core/Button";

function ViewDetails(props) {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      <Btn size="medium" color="primary" onClick={() => setSmShow(true)}>SHOW DETAILS</Btn>
      {/* <Button onClick={() => setSmShow(true)}>view more</Button> */}
      <Modal
        dialogClassName="modal-100w"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          <h2>{props.data.title}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{props.data.dueDate}</p>
            <h3>{props.data.subject}</h3>
            {/* <h4>{props.data.author}</h4> */}
            <p>{props.data.description}</p>  
            <h5>{props.data.file}</h5>
            {props.data.url !== "" && <a href={props.data.url}><GetAppIcon className="DowIco" /></a> }
            <p>{props.data.postTypee}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewDetails;
