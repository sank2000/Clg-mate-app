import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';

import DownloadButton from './AttachmentDownloadButton';

// to inc: https://codesandbox.io/s/material-demo-4m8sm?file=/demo.js

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#ff1a1a',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        View Details
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.data.title}
          <div className="subject">{props.data.subject}</div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="main-details">
            <span className="type">{props.data.postType}</span>
            <span className="type" style={{ float: "right" }}>
              <ScheduleIcon fontSize="small" className="due-icon" /> Due on: {props.data.dueDate}
            </span>
          </div>
          <hr />
          <div style={{ margin: "5px 0px" }} className="description">
            <h5>Description:</h5>
            <span>{props.data.description}</span>
          </div>
          <hr />
          <div className="post-details">
            <span className="posted-on">{props.data.postedOn}</span>
            <span className="posted-by" style={{ float: "right" }}> {props.data.authorType === "Staff" ? <VerifiedUserOutlinedIcon /> : <PermIdentityOutlinedIcon />} &nbsp; {props.data.postedBy}</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
          {(props.data.url.length !== 0 && props.data.url[0] !== "") &&
            <DownloadButton fileArray={props.data.url} />
          }
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default CustomizedDialogs;
