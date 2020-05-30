import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/Router";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

let mode = "light";
if (window.localStorage.getItem("dark") === true) {
  mode = "dark";
}
console.log("mode :" + mode);

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    type: mode
  },
});

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  const regEvt = navigator.serviceWorker.register('./ServiceWorker.js');
  regEvt.then(regObj => console.log('Service worker registered successfully.', 'Scope: ', regObj.scope));
  regEvt.catch(err => console.error('Unable to register service worker.'));
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
