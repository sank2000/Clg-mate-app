import React, { Component } from 'react';
import firebase from '../../firebase';
import PostForm from "./PostForm";
import MaterialForm from "./MaterialForm";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      url: '',
      progress: 'Upload',
      fileChooseState: 'Choose File'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    if (e.target.files.length === 0) return;
    const files = e.target.files[0];
    this.setState(() => ({ files }));
    let progress = 'Upload';
    let fileChooseState = 'File Choosen';
    this.setState(() => ({ progress }));
    this.setState(() => ({ fileChooseState }));
  }

  handleUpload = () => {
    console.log('Upload starting');
    const { files } = this.state;
    const storageRef = firebase.storage().ref('files/' + files.name);
    const uploadTask = storageRef.put(files);

    const uploadProgress = (snapshot) => {
      let percentComplete = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      let progress = `Uploading (${Math.round(percentComplete)}%)`;
      this.setState(() => ({ progress }));
    }

    const uploadComplete = () => {
      firebase.storage().ref('files').child(files.name).getDownloadURL()
        .then(url => {
          this.setState(() => ({ url }));
          let progress = 'Uploaded'
          this.setState(() => ({ progress }));
        })
        .catch(e => {
          console.log('Error: ' + e);
        });
    };

    uploadTask.on('state_changed', snapshot => uploadProgress(snapshot), (error) => { console.log(error); }, () => uploadComplete());
  }

  render(props) {
    return (
      <div className="app">
        {this.props.post ?
        <PostForm
          url={this.state.url}
          handleChange={this.handleChange}
          handleUpload={this.handleUpload}
          progress={this.state.progress}
          fileChooseState={this.state.fileChooseState}
        />
        :
        <MaterialForm
          url={this.state.url}
          handleChange={this.handleChange}
          handleUpload={this.handleUpload}
          progress={this.state.progress}
          fileChooseState={this.state.fileChooseState}
        />
        }
      </div>
    );
  }
}
export default NewPost;


