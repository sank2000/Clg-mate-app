import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { time, table } from "./Table";
import Schedule from "./Schedule";

function head(val) {
  return (
    <th>
      {val.start}-{val.end}
    </th>
  );
}

function bdy(val) {
  return (
    <Fragment>
      <tr>
        <td>{val[0]}</td>
        <td>{val[1]}</td>
        <td>{val[2]}</td>
        <td>{val[3]}</td>
        <td>{val[4]}</td>
        <td>{val[5]}</td>
        <td>{val[6]}</td>
        <td>{val[7]}</td>
        <td>{val[8]}</td>
      </tr>
    </Fragment>
  );
}

export default function App() {
  return (
    <div>
      <Schedule />
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>#</th>
            {time.map(head)}
          </tr>
        </thead>
        <tbody>{table.map(bdy)}</tbody>
      </Table>
    </div>
  );
}
