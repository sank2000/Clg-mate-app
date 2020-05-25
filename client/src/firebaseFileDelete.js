import firebase from './firebase';

const storageRef = firebase.storage().ref();

// function deleteFile(relativeFilePath) {
//   const fileRef = storageRef.child(relativeFilePath);
//   fileRef.delete().then(() => {
//     console.log('File deleted successfully.');
//     return true;
//   }).catch(error => {
//     console.error('There was an error deleting the specified file.');
//     return false;
//   });
// }

function deleteFile(files,type) {
    let done = true;
    for(var i=0;i<files.length;i++)
    {
      let relativeFilePath = type+"/"+files[i];
      const fileRef = storageRef.child(relativeFilePath);
      fileRef.delete().then(() => {
        console.log('File deleted successfully.');
        done = true;
      }).catch(error => {
        console.error('There was an error deleting the '+ files[i] +'file.');
        done = false;
        return;
      });
    }
    return done;
}

export default deleteFile;
