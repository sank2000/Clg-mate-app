import React, { useState, useEffect } from 'react';
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
    <Switch
      checked={state}
      onChange={handleChange}
      color="primary"
      name="mode"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />)
}
