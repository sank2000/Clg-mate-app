import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "../../containers/FlexContainer";
import { checkId} from "../RouteAccess";
import { Spinner } from "react-bootstrap";

export default function Start(props)
{
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);
  const handleClick = async () => {
      setLoad(true);
      let idObj = { id: id };
      const res = await checkId(idObj);
      setLoad(false);
      if (res.data.find) {
        props.SetFound(1);
        props.setData(res.data);
      }
      else {
        props.setOpen(true);
      }
    };


    return (<Container>
      <img src='./images/forgot.png' style={{ width: '10em', height: '10em', padding: '1rem' }} alt='' />
      <h2>Enter your ID number</h2>
      <TextField
        autoComplete="username"
        name="unique_id"
        variant="outlined"
        type="number"
        label="ID Number"
        autoFocus
        onChange={(event) => setId(event.target.value)}
        style={{ marginTop: "10px" }}
      />
      <br></br>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClick}
        style={{ marginTop: "10px" }}
      >
        ok&nbsp;{load && <Spinner animation="border" size="sm" />}
      </Button>
      </Container>
    )
}
