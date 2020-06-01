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

  const handleUpload = () => {
    const promises = [];
    let obtainedUrls = [];

    //for progress bar
    let totalProgress = 0;
    let currentProgress = 0;
    setProgress(0);

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
          const progressOfCurrentFile = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            if (progressOfCurrentFile === 100) {
              totalProgress += (progressOfCurrentFile / files.length);
              currentProgress = totalProgress;
            } else {
              currentProgress = totalProgress + (progressOfCurrentFile / files.length);
            }
            setProgress(currentProgress);
          }
        },
        error => console.log(error.code),
        async () => {
          const obtainedUrl = await uploadTask.snapshot.ref.getDownloadURL();
          obtainedUrls.push({ fileName: file.name, downloadURL: obtainedUrl })
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        setUrl(obtainedUrls);
        setMessage('All files uploaded');
        setAlertType('success');
        setAOpen(true);
        setProgress(100);
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
