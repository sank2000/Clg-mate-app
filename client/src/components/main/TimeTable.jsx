import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Table, Container } from "react-bootstrap";
import { time, table } from "../../constants/Table";
import IconButton from "@material-ui/core/IconButton";
import Schedule from "./Schedule";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../navigation/AppBar";

const avatarImageStyle = {
  width: 40,
  height: 40
};

function tab(ind, day) {
  return (
    <tr key={ind}>
      <td>{time[ind].start} </td>
      <td>{table[day][ind]}</td>
      <td>{time[ind].end}</td>
    </tr>
  );
}

function Timetable(props) {
  return (
    <Container style={{ marginTop: "25px", backgroundColor: "white" }}>
      <Table striped bordered hover size="sm" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th><h5>Start</h5></th>
            <th><h5>Period</h5></th>
            <th><h5>End</h5></th>
          </tr>
        </thead>
        <tbody>
          {time.map((data, ind) => {
            return tab(ind, props.day);
          })}
        </tbody>
      </Table>
    </Container>
  );
}

function getDay() {
  let d = new Date();
  return d.getDay() - 1;
}

const avaStyle1 = {
  fontSize: "15px",
  border: "4px solid white",
  backgroundColor: "#606060"
};
const avaStyle2 = {
  fontSize: "15px",
  border: "4px solid white",
  backgroundColor: "black"
};
const avaStyle3 = {
  fontSize: "15px",
  border: "4px solid white",
  backgroundColor: "blue"
};
export default function () {
  const [activeStep, setActiveStep] = React.useState(getDay());

  function Div(props) {
    return (
      <div>
        <IconButton
          style={{ outline: "none" }}
          onClick={() => setActiveStep(props.day)}
        >
          <Avatar
            style={
              getDay() === props.day
                ? Object.assign({}, avatarImageStyle, avaStyle3)
                : activeStep === props.day
                  ? Object.assign({}, avatarImageStyle, avaStyle2)
                  : Object.assign({}, avatarImageStyle, avaStyle1)
            }
          >
            {props.ico}
          </Avatar>
        </IconButton>
        <br />
        <p
          style={
            getDay() === props.day
              ? { display: "inline", color: "blue" }
              : activeStep === props.day
                ? { display: "inline", color: "black" }
                : { display: "inline" }
          }
        >
          {props.title}
        </p>
      </div>
    );
  }

  return (
    <>
      <NavigationBar />
      <Schedule />
      <Container style={{ position: "relative" }}>
        <hr
          style={{
            border: "0.5px solid #303030",
            position: "absolute",
            width: "80%",
            left: "10%",
            top: "20%"
          }}
        />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item style={{ flexShrink: "3" }}>
            <Div ico={"M"} title={"Monday"} day={0} />
          </Grid>
          <Grid item>
            <Div ico={"Tu"} title={"Tuesday"} day={1} />
          </Grid>
          <Grid item>
            <Div ico={"W"} title={"Wednesday"} day={2} />
          </Grid>
          <Grid item>
            <Div ico={"Th"} title={"Thursday"} day={3} />
          </Grid>
          <Grid item>
            <Div ico={"F"} title={"Friday"} day={4} />
          </Grid>
        </Grid>
      </Container>
      <Timetable day={activeStep} />
    </>
  );
}
