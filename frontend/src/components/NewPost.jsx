import React, { Component, Fragment } from 'react';
import firebase from '../firebase';
import Popup from "reactjs-popup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Btn from './Btn';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      url: '',
      done: false,
      progress: 'Choose a file to upload.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const files = e.target.files[0];
      this.setState(() => ({ files }));
      var progress = 'File selected';
      this.setState(() => ({ progress }));
    }
  }

  handleUpload = () => {
    console.log('Upload starting');
    const { files } = this.state;
    const storageRef = firebase.storage().ref('files/' + files.name);
    const uploadTask = storageRef.put(files);

    const uploadProgress = (snapshot) => {
      let percentComplete = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + percentComplete + '% done');
      var progress = `Uploading... ${percentComplete}%`;
      this.setState(() => ({ progress }));
    }

    const uploadComplete = () => {
      firebase.storage().ref('files').child(files.name).getDownloadURL()
        .then(url => {
          console.log(`
          Upload completed!
          ${url}
          `);
          this.setState(() => ({ url }));
          var progress = 'Upload complete.'
          this.setState(() => ({ progress }));
          var done = true;
          this.setState(() => ({ done }));
        })
        .catch(e => {
          console.log('Error: ' + e);
        });
    }

    uploadTask.on('state_changed', snapshot => uploadProgress(snapshot), (error) => { console.log(error); }, () => uploadComplete());
  }

  

  render() {
    return (
      <div className="app">
        <Popup
          contentStyle={{ borderRadius: "25px" }}
          className="pop"
          trigger={ <Button className="newPost" variant="outlined" color="primary">New Post </Button> }
          modal
          closeOffDocumentClick
        >
          {close => (
            <div className="modal">
              <div className="head">
                <HighlightOffIcon className="close" onClick={close} color="secondary" />
              </div>
              <div className="uploadform">
                <form action="/newpost" method="post">
                  <TextField variant="outlined" required type="text" name="title" id="outlined-basic" fullWidth label="Title" />
                  <TextField variant="outlined" required name="description" rows={4} id="filled-multiline-static" fullWidth multiline label="Description" />
                  <TextField variant="outlined" required type="text" name="subName" fullWidth label="Subject Name" />
                  <TextField variant="outlined" required type="text" name="subCode" fullWidth label="Subject Code" />
                  <input type="file" name="file" onChange={this.handleChange} />
                  <br />
                  <input type="hidden" name="url" value={this.state.url} />
                  <Button onClick={this.handleUpload} size="small" variant="contained" color="secondary">
                  <CloudUploadIcon variant="outlined" />
                    upload
                  </Button>
                  <p>{this.state.progress}</p>
                  <Btn done={this.state.done}></Btn>
                </form>
              </div>
            </div>
          )}
        </Popup>
      </div>
       );
  }
}
export default NewPost;


