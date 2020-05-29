import React, { useState } from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../messages/alerts/alert';

import firebase from '../../functions/firebase';
import PostForm from "../forms/PostForm";
import MaterialForm from "../forms/MaterialForm";

import allowedTypes from './../../constants/supportedFileTypes';

function NewPost(props) {
  const [files, setFiles] = useState(null);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(-1);
  const [fileChooseState, setFileChooseState] = useState('Choose File');
  const [message, setMessage] = useState('');

  const [Aopen, setAOpen] = useState(false);
  const AhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAOpen(false);
  };

  const handleChange = event => {
    if (event.target.files.length === 0) return;
    const chosenFiles = Array.from(event.target.files);
    let proceed = true;

    chosenFiles.forEach(chosenFile => {
      const chosenFileType = chosenFile.name.toString().split('.').pop();
      if (!allowedTypes.includes(chosenFileType)) {
        setMessage(`Files of type '${chosenFileType}' are not allowed.`);
        setAOpen(true);
        proceed = false;
      }
    });

    if (!proceed) return;
    setFiles(chosenFiles);
    let fileChooseState = 'File Chosen';
    setFileChooseState(fileChooseState);
  }

  const handleUpload = () => {
    const chosenFiles = files;
    let fileNo = 1;
    let totalFileSize = 0;
    let totalBytesTransferred = 0;
    setProgress(0);
    chosenFiles.map((chosenFile) => {
      totalFileSize += chosenFile.size;
      console.log('Upon calculating:', totalFileSize);
      return null;
    });
    chosenFiles.forEach(file => {
      let storageRef;
      props.post ?
        storageRef = firebase.storage().ref('posts/' + file.name) :
        storageRef = firebase.storage().ref('materials/' + file.name);
      const uploadTask = storageRef.put(file);

      const uploadProgress = (snapshot) => {
        console.log('Upon file uploading: ', totalFileSize);
        if ((file.size === snapshot.bytesTransferred + totalBytesTransferred) && !chosenFiles.length === 1) {
          totalBytesTransferred = file.size;
        }
        let progressText = ((totalBytesTransferred + snapshot.bytesTransferred) / totalFileSize) * 100;
        setProgress(progressText);
      }

      const uploadComplete = () => {
        let urlObtainer;
        props.post ?
          urlObtainer = firebase.storage().ref('posts').child(file.name).getDownloadURL() :
          urlObtainer = firebase.storage().ref('materials').child(file.name).getDownloadURL();
        urlObtainer.then(link => {
          let mutatingArray = url;
          mutatingArray.push({ fileName: file.name, downloadURL: link });

          if (fileNo === files.length) {
            let obtainedUrl = mutatingArray;
            setUrl(obtainedUrl);
            setProgress(100);
            return;
          }
          fileNo += 1;
        })
          .catch(e => {
            console.log('Error: ' + e);
          });
      }

      uploadTask.on(
        'state_changed',
        snapshot => uploadProgress(snapshot),
        error => {
          console.log(error);
          // window.open("/oops", "_self");
        },
        () => uploadComplete()
      );
    });
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
          />
          :
          <MaterialForm
            url={url}
            handleChange={handleChange}
            handleUpload={handleUpload}
            progress={progress}
            fileChooseState={fileChooseState}
          />
      }
      <Snackbar open={Aopen} autoHideDuration={6000} onClose={AhandleClose}>
        <Alert onClose={AhandleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NewPost;
