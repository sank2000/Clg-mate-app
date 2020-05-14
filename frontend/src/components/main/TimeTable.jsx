import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { time, table } from "../../constants/Table";
import Schedule from "./Schedule";
import NavigationBar from '../navigation/AppBar';

function head(val) {
  return <th> {val[0]}</th>;
}

function bdy(val, ind) {
  return (
    <Fragment>
      <tr>
        <th>
          {time[ind].start}-{time[ind].end}
        </th>
        <td>{table[0][ind + 1]}</td>
        <td>{table[1][ind + 1]}</td>
        <td>{table[2][ind + 1]}</td>
        <td>{table[3][ind + 1]}</td>
        <td>{table[4][ind + 1]}</td>
      </tr>
    </Fragment>
  );
}

export default function App() {
  return (
    <>
      <NavigationBar title="Time Table" />
      <Schedule />
      <h3>Time Table</h3>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>#</th>
            {table.map(head)}
          </tr>
        </thead>
        <tbody>{time.map(bdy)}</tbody>
      </Table>
    </>
  );
}
