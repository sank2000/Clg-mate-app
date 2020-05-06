import React, { Component } from 'react';
import firebase from '../firebase';
import PostForm from "./PostForm"

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
          <PostForm
            url={this.state.url}  
            handleChange={this.handleChange}
            handleUpload={this.handleUpload}
            progress = {this.state.progress}
          ></PostForm>
        </div>       
    );
  }
}
export default NewPost;


