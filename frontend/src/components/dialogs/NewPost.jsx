import React, { Component } from 'react';
import firebase from '../../firebase';
import PostForm from "./forms/PostForm";
import MaterialForm from "./forms/MaterialForm";

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
    let fileChooseState = 'File Chosen';
    this.setState(() => ({ progress }));
    this.setState(() => ({ fileChooseState }));
  }

  handleUpload = () => {
    console.log('Upload starting');
    const { files } = this.state;
    let storageRef = firebase.storage().ref('materials/' + files.name)
    this.props.post &&
      (storageRef = firebase.storage().ref('posts/' + files.name))
    const uploadTask = storageRef.put(files);

    const uploadProgress = (snapshot) => {
      let percentComplete = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      let progress = `Uploading (${Math.round(percentComplete)}%)`;
      this.setState(() => ({ progress }));
    }

    const uploadComplete = () => {
      let urlObtainer;
      this.props.post ?
        urlObtainer = firebase.storage().ref('posts').child(files.name).getDownloadURL() :
        urlObtainer = firebase.storage().ref('materials').child(files.name).getDownloadURL();
      urlObtainer.then(url => {
        this.setState(() => ({ url }));
        let progress = 'Uploaded'
        this.setState(() => ({ progress }));
      })
        .catch(e => {
          console.log('Error: ' + e);
        });
    };

    uploadTask.on('state_changed', snapshot => uploadProgress(snapshot), (error) => {
      console.log(error);
      window.open("/oops", "_self");
    }, () => uploadComplete());
  }

  render() {
    return (
      <div className="app">
        {
          this.props.post ?
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


