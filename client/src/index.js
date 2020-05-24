import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/Router";

if ('serviceWorker' in navigator) {
  const regEvt = navigator.serviceWorker.register('./ServiceWorker.js');
  regEvt.then(() => console.log('Service worker registered successfully'));
  regEvt.catch(err => console.error('Unable to register service worker.'));
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
