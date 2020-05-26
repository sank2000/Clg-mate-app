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

const deleteFile =  async(files,type)  => {
    for(var i=0;i<files.length;i++)
    {
      let relativeFilePath = type+"/"+files[i]; 
      const fileRef = storageRef.child(relativeFilePath);
      await fileRef.delete().then(() => {
        console.log('File deleted successfully.');
      }).catch(error => {
        console.error('There was an error deleting the '+ files[i] +'file.');
        window.location.reload();
        return;
      });
      if(i===files.length - 1)
      {
        window.location.reload();
      }
    }
}

export default deleteFile;
