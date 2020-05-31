import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";

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
      <Switch
        checked={state}
        icon={
          <WbSunnyIcon style={{ fontSize: "1.3rem", color: "#FF8F00" }} />
        }
        edge="start"
        color="default"
        checkedIcon={
          <NightsStayIcon style={{ fontSize: "1.3rem", color: "yellow" }} />
        }
        onChange={handleChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </>
  );
}
