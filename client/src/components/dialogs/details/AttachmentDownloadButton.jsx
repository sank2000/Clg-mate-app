import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function renderItem(item) {
  return (
    <MenuItem key={item.fileName} onClick={() => window.open(item.downloadURL)}>
      {item.fileName}
    </MenuItem>
  );
}

function DownloadMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let downloadAll = () => {
    props.fileArray.forEach(file => {
      window.open(file.url, '_blank');
    });
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    if (props.fileArray.length === 1) window.open(props.fileArray[0].url, '_blank');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
      >
        Download
      </Button>
      {props.fileArray.length !== 1 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {props.fileArray.map(renderItem)}
          <MenuItem onClick={downloadAll}>Download all</MenuItem>
        </Menu>
      )}
    </div>
  );
}

export default DownloadMenu;
