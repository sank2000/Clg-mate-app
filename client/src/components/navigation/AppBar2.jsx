import React from 'react';
import AppBar from "./AppBar";

export default function (props) {
  return (
    <>
      <AppBar title={props.title}></AppBar>
      <div style={{ minHeight: "15px" }}>
      </div>
    </>
  )
}