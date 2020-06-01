import React, { useState } from 'react';
import Snackbar from "@material-ui/core/Snackbar";

import Alert from '../messages/alerts/alert';
import firebase from '../../functions/firebase';
import PostForm from "./PostForm";
import MaterialForm from "./MaterialForm";
import allowedTypes from '../../constants/supportedFileTypes';

function NewPostHandler(props) {
  const [files, setFiles] = useState(null);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(-1);
  const [fileChooseState, setFileChooseState] = useState('Choose File');
  const [message, setMessage] = useState('');

  const [Aopen, setAOpen] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.files.length === 0) return;
    const chosenFiles = Array.from(event.target.files);
    let allowed = true;

    chosenFiles.forEach(chosenFile => {
      const chosenFileType = chosenFile.name.toString().split('.').pop(); //get file extension
      if (!allowedTypes.includes(chosenFileType)) {
        setMessage(`Files of type '${chosenFileType}' are not allowed.`);
        setAlertType('error');
        setAOpen(true);
        allowed = false;
      }
    });

    if (!allowed) return;

    setFiles(chosenFiles);
    setFileChooseState(`${chosenFiles.length} files chosen`);
  }

  const handleUpload = (callback) => {
    const promises = [];
    let obtainedUrls = [];

    //for progress bar
    let totalFileSize = 0;
    let totalBytesTransferred = 0;
    setProgress(0);
    files.map((file) => {
      totalFileSize += file.size;
      console.log('Upon calculating:', totalFileSize);
      return null;
    });

    files.forEach(file => {
      let storageRef;
      props.post ?
        storageRef = firebase.storage().ref('posts/' + file.name) :
        storageRef = firebase.storage().ref('materials/' + file.name);
      const uploadTask = storageRef.put(file);
      promises.push(uploadTask);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            console.log(`[${file.name}]Progress: ${progress}%`);
          }

          // for progress bar
          if ((file.size === snapshot.bytesTransferred + totalBytesTransferred) && !files.length === 1) {
            totalBytesTransferred = file.size;
          }
          let progressText = ((totalBytesTransferred + snapshot.bytesTransferred) / totalFileSize) * 100;
          setProgress(progressText);
        },
        error => console.log(error.code),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          obtainedUrls.push({ fileName: file.name, url: downloadURL })
          console.log('Uploaded' + file.name)
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        console.log(obtainedUrls);
        setUrl(obtainedUrls);
        setMessage('All files uploaded');
        setAlertType('success');
        setAOpen(true);
        setProgress(100);
        console.log(url);
        setTimeout(callback(obtainedUrls), 1000);
      }
      )
      .catch(err => console.log(err.code));
  };

  return (
    <div className="app">
      {
        props.post ?
          <PostForm
            url={url}
            handleChange={handleChange}
            handleUpload={handleUpload}
            progress={progress}
            fileChooseState={fileChooseState}
            setType={props.setType}
          />
          :
          <MaterialForm
            url={url}
            handleChange={handleChange}
            handleUpload={handleUpload}
            progress={progress}
            fileChooseState={fileChooseState}
            setType={props.setType}
          />
      }
      <Snackbar open={Aopen} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity={alertType}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NewPostHandler;
