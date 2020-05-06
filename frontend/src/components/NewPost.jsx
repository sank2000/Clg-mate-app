import React, { Component } from 'react';
import firebase from '../firebase';
import Popup from "reactjs-popup";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

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
          contentStyle={{ borderRadius: "15px" }}
          className="pop"
          trigger={<Button className="newPost" variant="outlined" color="primary">New Post </Button>}
          modal
        >
          {close => (
            <div className="modal">
              <div className="head">
                <h1 className="title">New post</h1>
                <CloseOutlinedIcon fontSize="large" className="close" onClick={close} color="secondary" />
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
                    label="Author (To be removed after setting Login options)"
                    size="small" />
                  <TextField style={applyMargin}
                    variant="outlined"
                    required
                    type="text"
                    name="subName"
                    label="Subject"
                    className="halfWidth"
                    size="small"
                  />
                  <TextField style={applyMargin}
                    variant="outlined"
                    required
                    type="text"
                    name="postType"
                    label="Post Type"
                    className="halfWidth"
                    size="small"
                  />
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
                    type="date"
                    name="dueDate"
                    label="Due Date"
                    defaultValue={(new Date()).toISOString().split('T')[0]}
                    id="datetime-local"
                    size="small"
                    InputLabelProps={{ shrink: true, }} />
                  <div className="file-section" style={applyMargin}>
                    <input type="hidden" name="url" value={this.state.url} />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="contained-button-file"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" component="span" disableElevation>
                        Choose File
                    </Button>
                    </label>
                    <Button
                      onClick={this.handleUpload}
                      size="medium"
                      variant="contained"
                      color="secondary"
                      style={{ float: "right" }}>
                      <CloudUploadOutlinedIcon
                        fontSize="small"
                        className="uploadIcon" />
                    &nbsp; {this.state.progress}
                    </Button>
                  </div>
                  <Button style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Button>
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


