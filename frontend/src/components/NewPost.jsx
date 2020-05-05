import React, { Component } from 'react';
import firebase from '../firebase';
import Popup from "reactjs-popup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import SubmitButton from './SubmitButton';

const applyMargin = {
  margin: "7px"
}

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      url: '',
      done: false,
      progress: 'Upload'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const files = e.target.files[0];
      this.setState(() => ({ files }));
      var progress = 'Upload';
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
      var progress = `Uploading (${percentComplete}%)`;
      this.setState(() => ({ progress }));
    }

    const uploadComplete = () => {
      firebase.storage().ref('files').child(files.name).getDownloadURL()
        .then(url => {
          this.setState(() => ({ url }));
          var progress = 'Uploaded'
          this.setState(() => ({ progress }));
          var done = true;
          this.setState(() => ({ done }));
        })
        .catch(e => {
          console.log('Error: ' + e);
        });
    };

    uploadTask.on('state_changed', snapshot => uploadProgress(snapshot), (error) => { console.log(error); }, () => uploadComplete());
  }

  render() {
    return (
      <div className="app">
        <Popup
          contentStyle={{ borderRadius: "25px" }}
          className="pop"
          trigger={<Button className="newPost" variant="outlined" color="primary">New Post </Button>}
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
                  <TextField style={applyMargin}
                    variant="outlined"
                    required type="text"
                    name="title"
                    fullWidth
                    label="Title" />
                  <TextField style={applyMargin}
                    variant="outlined"
                    required
                    type="text"
                    name="author"
                    fullWidth
                    margin="dense"
                    label="Author"
                    size="small" />
                  <TextField style={applyMargin}
                    variant="outlined"
                    required
                    name="description"
                    rows={4}
                    fullWidth
                    multiline
                    label="Description" />
                  <TextField style={applyMargin}
                    variant="outlined"
                    required
                    type="text"
                    name="subName"
                    label="Subject Name"
                    className="halfWidth" />
                  <TextField style={applyMargin}
                    variant="outlined"
                    required
                    type="date"
                    name="DueDate"
                    label="Due Date"
                    id="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true, }} />
                  <input style={applyMargin}
                    type="file"
                    name="file"
                    onChange={this.handleChange} />
                  <input type="hidden" name="url" value={this.state.url} />
                  <Button style={applyMargin}
                    onClick={this.handleUpload}
                    size="small"
                    variant="contained"
                    color="secondary"
                    className="upload">
                    <CloudUploadOutlinedIcon
                      fontSize="small"
                      className="uploadIcon" />
                    &nbsp; {this.state.progress}
                  </Button>
                  <SubmitButton style={applyMargin} done={this.state.done} />
                </form>
              </div>
            </div>
          )}
        </Popup>
      </div >
    );
  }
}
export default NewPost;


