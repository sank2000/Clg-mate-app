import React from "react";
import IconButton from '@material-ui/core/IconButton';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

function QuickDownload(props) {

  const handleClick = () => {
    props.fileArray.forEach(file => {
      console.log(file);
      window.open(file.downloadURL, '_blank');
    });
  };

  return (
    <div>
      <IconButton style={{ padding: '7px' }}
        color="primary"
        onClick={handleClick}
      >
        <GetAppOutlinedIcon />
      </IconButton>
    </div >
  );
}

export default QuickDownload;
