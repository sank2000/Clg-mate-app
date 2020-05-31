import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';

let mode = false;
if (window.localStorage.getItem("dark")) {
  if (window.localStorage.getItem("dark") === 'true') {
    mode = true;
  }
}


export default function () {
  const [state, setState] = useState(mode);
  const handleChange = (e) => {
    setState(e.target.checked);
    window.localStorage.setItem("dark", e.target.checked);
    window.location.reload();
  };

  return (
    <>
      <span style={state === true ? { color: "grey" } : { color: "yellow" }}>☀︎</span>
      <Switch
        checked={state}
        onChange={handleChange}
        color="primary"
        name="mode"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <span style={state === true ? { color: "red" } : { color: "grey" }}>☾</span>
    </>)
}

//slateblue