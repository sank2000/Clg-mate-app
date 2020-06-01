import DateFnsUtils from "@date-io/date-fns";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import React, { useState, useEffect } from "react";
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";

import LinearProgressWithLabel from './LinearProgressWithLabel';
import subjects from '../../constants/subjects'

function renderSubjects(subject) {
  return (
    <MenuItem key={subject.code} value={subject.name}>{`${subject.code} - ${subject.name}`}</MenuItem>
  );
}

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

function PostForm(props) {
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [noOfFiles, setNoOfFiles] = useState(0);

  const handlePostTypeChange = event => {
    setType(event.target.value);
  };

  const handleSubjectChange = event => {
    setSubject(event.target.value);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    props.setType("");
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const applyMargin = {
    margin: "7px"
  };

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <>
      <Dialog onClose={handleClose} scroll='body' aria-labelledby="customized-dialog-title" open={show}>
        <DialogTitle disableTypography id="customized-dialog-title" onClose={handleClose}>
          <Typography component="span" variant="h5"> New Post </Typography>
        </DialogTitle>
        <form action="/posts/new" method="post">
          <DialogContent dividers style={{ padding: '10px', paddingRight: '21px' }}>
            <TextField style={applyMargin}
              variant="outlined"
              required type="text"
              name="title"
              fullWidth
              label="Title" />
            <Grid container spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" style={applyMargin} size="small" fullWidth >
                  <InputLabel>
                    Subject
                  </InputLabel>
                  <Select
                    name="subName"
                    required
                    value={subject}
                    onChange={handleSubjectChange}
                    label="Subject"
                  >
                    <MenuItem disabled={true} value="">Select a Subject</MenuItem>
                    {subjects.map(renderSubjects)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" style={applyMargin} size="small" fullWidth >
                  <InputLabel>
                    Post Type
                  </InputLabel>
                  <Select
                    name="postType"
                    required
                    value={type}
                    onChange={handlePostTypeChange}
                    label="Post Type"
                  >
                    <MenuItem disabled={true} value="">Select a type</MenuItem>
                    <MenuItem value={"Assignment"}>Assignment</MenuItem>
                    <MenuItem value={"Announcement"}>Announcement</MenuItem>
                    <MenuItem value={"Home work"}>Home work</MenuItem>
                    <MenuItem value={"Instruction"}>Instruction</MenuItem>
                    <MenuItem value={"Test"}>Test</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField style={applyMargin}
              variant="outlined"
              required
              name="description"
              rows={4}
              fullWidth
              multiline
              label="Description" />
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
                size="small"
                variant="inline"
                inputVariant="outlined"
                name="dueDate"
                label="Due Date"
                format="dd-MMM-yyyy"
                value={selectedDate}
                minDate={new Date()}
                onChange={date => handleDateChange(date)}
                style={{ ...applyMargin, outline: "none" }}
              />
            </MuiPickersUtilsProvider>
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    <div className="file-section" style={applyMargin}>
                      <input type="hidden" name="url" value={JSON.stringify(props.url)} />
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="contained-button-file"
                        name="file"
                        multiple
                        onChange={(event) => { props.handleChange(event); setNoOfFiles(event.target.files.length); }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" disableElevation>
                          {props.fileChooseState}
                        </Button>
                      </label>
                    </div>
                  </Grid>
                  <Grid item>
                    {noOfFiles !== 0 &&
                      <Button
                        onClick={props.handleUpload}
                        size="medium"
                        variant="contained"
                        color="secondary"
                        style={{ float: "right" }}>
                        <CloudUploadOutlinedIcon
                          fontSize="small"
                          className="uploadIcon" />
                      &nbsp; Upload
                    </Button>
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {
                  (props.progress !== -1 && props.progress !== 100) &&
                  <LinearProgressWithLabel value={props.progress} />
                }
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button disabled={props.url.length !== noOfFiles} style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default PostForm;
