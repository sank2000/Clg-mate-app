import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";


let mode = false;
if (window.localStorage.getItem("dark")) {
  if (window.localStorage.getItem("dark") === 'true') {
    mode = true;
  }
}

export default function () {
  const [dark, setDark] = useState(mode);

  function handleClickL() {
    setDark(false);
    window.localStorage.setItem("dark", false);
    window.location.reload();
  }
  function handleClickD() {
    setDark(true);
    window.localStorage.setItem("dark", true);
    window.location.reload();
  }

  return (
    <div className="App">
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          variant="contained"
          color={dark ? "default" : "primary"}
          startIcon={
            <WbSunnyIcon
              style={
                dark
                  ? { fontSize: "1.3rem" }
                  : { fontSize: "1.3rem", color: "#FF8F00" }
              }
            />
          }
          onClick={handleClickL}
        />
        <Button
          variant="contained"
          color={dark ? "primary" : "default"}
          onClick={handleClickD}
          startIcon={
            <NightsStayIcon
              style={
                dark
                  ? { fontSize: "1.3rem", color: "yellow" }
                  : { fontSize: "1.3rem" }
              }
            />
          }
        />
      </ButtonGroup>
    </div>
  );
}
