import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import Delete from "./DeletePost";
import AuthApi from "../../auth/AuthApi";
import DownloadButton from './AttachmentDownloadButton';

const classes = (theme) => ({
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

const DialogTitle = withStyles(classes)((props) => {
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

const ContentDivider = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))(Divider);

function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;
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
        <DialogTitle disableTypography id="customized-dialog-title" onClose={handleClose}>
          <Typography component="span" variant="h5">{props.data.title}</Typography>
          <Typography component="div" variant="body1">{props.data.subject}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="body1" component="span" style={{ marginRight: '15px' }}>{props.data.postType}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="span" style={{ float: 'right' }}>
                <ScheduleIcon fontSize="small" className="due-icon" /> Due on: {props.data.dueDate}
              </Typography>
            </Grid>
          </Grid>
          <ContentDivider variant='fullWidth' />
          <div style={{ margin: "5px 0px" }}>
            <Typography variant="h6" component="h6">Description:</Typography>
            <Typography variant="body1" component="div">{props.data.description}</Typography>
          </div>
          <ContentDivider variant='fullWidth' />
          <Grid container justify="space-between">
            <Grid item>
              <Typography component="span" variant="body2" style={{ marginRight: '30px' }}> {props.data.postedOn}</Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  {props.data.postByType === "Staff" ? <VerifiedUserOutlinedIcon /> : <PermIdentityOutlinedIcon />}
                </Grid>
                <Grid item>
                  <Typography component="span" variant="body2"> &nbsp; {props.data.postedBy}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container>
            {(user._id === props.data.postedById || user.type === "Staff") && <Delete data={props.data} type="post" />}
          </Grid>
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
