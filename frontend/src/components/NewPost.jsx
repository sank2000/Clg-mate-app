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
        >
          {close => (
            <div className="modal">
              <div className="head">
                <h1 className="title">New post</h1>
                <HighlightOffIcon className="close" onClick={close} color="secondary" />
                <hr></hr>
              </div>
              <div className="uploadform">
                <form action="/newpost" method="post">
                  <TextField variant="outlined" required type="text" name="title" fullWidth label="Title" />
                  <TextField variant="outlined" required type="text" name="author"   fullWidth label="Author" />
                  <TextField variant="outlined" required name="description" rows={4} fullWidth multiline label="Description" />
                  <TextField variant="outlined" required type="text" name="subName"  label="Subject Name" className ="halfWidth" />
                  <TextField variant="outlined" required type="text" name="subCode"  label="Subject Code" className ="halfWidth" />
                  <TextField variant="outlined" required type="date" name="DueDate" label="Due Date" id="datetime-local" fullWidth InputLabelProps={{ shrink: true, }} />
                  <input type="file" name="file" onChange={this.handleChange} />
                  <input type="hidden" name="url" value={this.state.url} />
                  <Button onClick={this.handleUpload} size="small" variant="contained" color="secondary" className="upload">
                  <CloudUploadIcon variant="outlined" fontSize="small" className ="uploadIcon" />
                    &nbsp; upload
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


