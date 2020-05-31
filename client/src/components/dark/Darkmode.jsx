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
      {state === true ? <span style={{ color: "yellow" }}>☾</span> : <span style={{ color: "slateblue" }}>☀︎</span>}
      <Switch
        checked={state}
        onChange={handleChange}
        color="primary"
        name="mode"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />

    </>)
}

//slateblue