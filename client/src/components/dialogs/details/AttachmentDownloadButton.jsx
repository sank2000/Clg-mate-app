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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    props.fileArray.length === 1 && console.log(props.fileArray[0].fileName);
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
        </Menu>
      )}
    </div>
  );
}

export default DownloadMenu;
