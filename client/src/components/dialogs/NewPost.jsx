import React, { useState } from 'react';
import firebase from '../../firebase';
import PostForm from "../forms/PostForm";
import MaterialForm from "../forms/MaterialForm";

function NewPost(props) {
  const [files, setFiles] = useState(null);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState('Upload');
  const [fileChooseState, setFileChooseState] = useState('Choose File');

  const handleChange = e => {
    if (e.target.files.length === 0) return;
    const chosenFiles = Array.from(e.target.files);

    setFiles(chosenFiles);
    let progress = 'Upload';
    let fileChooseState = 'File Chosen';
    setProgress(progress);
    setFileChooseState(fileChooseState);
  }

  const handleUpload = () => {
    const chosenFiles = files;
    let fileNo = 1;
    chosenFiles.forEach(file => {
      let storageRef;
      props.post ?
        storageRef = firebase.storage().ref('posts/' + file.name) :
        storageRef = firebase.storage().ref('materials/' + file.name);
      const uploadTask = storageRef.put(file);

      const uploadProgress = (snapshot) => {
        let percentComplete = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        let progressText = `Uploading file ${fileNo} (${Math.round(percentComplete)}%)`;
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

          let calcProgress = `Uploaded file ${fileNo}`;
          setProgress(calcProgress);
          if (fileNo === files.length) {
            let obtainedUrl = mutatingArray;
            setUrl(obtainedUrl);
            let calcProgress = `Uploaded all files`;
            setProgress(calcProgress);
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
    </div>
  );
}

export default NewPost;
