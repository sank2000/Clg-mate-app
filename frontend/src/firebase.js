import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyA7pRaNRzmIPhkQkuMWkPvyA6gugjh3Z34",
  authDomain: "collegemate-web-app.firebaseapp.com",
  databaseURL: "https://collegemate-web-app.firebaseio.com",
  projectId: "collegemate-web-app",
  storageBucket: "collegemate-web-app.appspot.com",
  messagingSenderId: "363641388658",
  appId: "1:363641388658:web:306b3eae38fd92f52b4ceb",
  measurementId: "G-Z44KENE8JL"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
