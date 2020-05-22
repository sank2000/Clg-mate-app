import React, { useState, Fragment } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Start from "./Forgot/Start";
import Valid from "./Forgot/Valid";
import Reset from "./Forgot/Reset";
import Send from "./Forgot/Send";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [found, SetFound] = useState(0);
  const [data, setData] = useState({});
  const [msg, setMsg] = useState({
    content: "ID number Doesn't Exist",
    type: "error"
  });
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Fragment>
      {found === 0 && <Start setOpen={setOpen} setData={setData} setMsg={setMsg} SetFound={SetFound} />}
      {found === 1 && <Send setOpen={setOpen} data={data} setMsg={setMsg} SetFound={SetFound} />}
      {found === 2 && <Valid setOpen={setOpen} data={data} setMsg={setMsg} SetFound={SetFound} />}
      {found === 3 && <Reset setOpen={setOpen} data={data} setMsg={setMsg} SetFound={SetFound} />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type}>
          {msg.content}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
