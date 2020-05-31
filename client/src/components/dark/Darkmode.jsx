import React, { useState } from "react";
import Switch from '@material-ui/core/Switch';
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";

import { useTheme, makeStyles } from '@material-ui/styles'

const mode = window.localStorage.getItem('dark') === 'true' ? true : false;

export default function () {
  const [dark, setDark] = useState(mode);
  const theme = useTheme();
  const classes = makeStyles({
    icon: {
      fontSize: '1.42rem',
      background: dark ? theme.palette.primary.dark : theme.palette.primary.main,
      padding: '2px',
      color: dark ? '#ffeb3b' : '#ffa000',
      borderRadius: '100%'
    }
  })();

  const handleChange = (e) => {
    setDark(!dark);
    window.localStorage.setItem("dark", !dark);
    window.location.reload();
  }

  return (
    <div className="App">
      <Switch
        checked={dark}
        icon={
          <WbSunnyIcon className={classes.icon} />
        }
        edge="start"
        color="primary"
        checkedIcon={
          <NightsStayIcon className={classes.icon} />
        }
        onChange={handleChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}
