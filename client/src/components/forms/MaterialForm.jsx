import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Btn from "@material-ui/core/Button";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import LinearProgressWithLabel from './LinearProgressWithLabel';
import subjects from '../../constants/subjects'

function renderSubjects(subject) {
  return (
    <MenuItem key={subject.code} value={subject.name}>
      {`${subject.code} - ${subject.name}`}
    </MenuItem>
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
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [subject, setSubject] = useState('');
  const handleMaterialTypeChange = event => {
    setType(event.target.value);
  };



  const handleSubjectChange = event => {
    setSubject(event.target.value);
  };

  const handleClose = () => {
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
        <DialogTitle disableTypography onClose={handleClose}>
          <Typography component="span" variant="h5"> New Material </Typography>
        </DialogTitle>
        <form method="post" action="/materials/new" style={{ paddingRight: '15px' }}>
          <DialogContent dividers>
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
                    <MenuItem disabled={true} value=''>Select a Subject</MenuItem>
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
                    name="materialType"
                    required
                    value={type}
                    onChange={handleMaterialTypeChange}
                    label="Post Type"
                  >
                    <MenuItem disabled={true} value="">Select a type</MenuItem>
                    <MenuItem value={"Book"}>Book</MenuItem>
                    <MenuItem value={"Form"}>Form</MenuItem>
                    <MenuItem value={"Question Bank"}>Question Bank</MenuItem>
                    <MenuItem value={"Question Paper"}>Question Paper</MenuItem>
                    <MenuItem value={"Notes"}>Notes</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField style={applyMargin}
              variant="outlined"
              type="text"
              name="author"
              fullWidth
              label="Author" />
            <TextField style={applyMargin}
              variant="outlined"
              required
              name="description"
              rows={4}
              fullWidth
              multiline
              label="Description"
            />
            <Grid container direction="column" style={{ marginTop: '8px', marginLeft: '10px' }}>
              <Grid item>
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    <input id='urls' type="hidden" name="url" value={JSON.stringify(props.url)} />
                    <input
                      required
                      style={{ display: "none" }}
                      type="file"
                      id="contained-button-file"
                      name="file"
                      multiple
                      onChange={props.handleChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Btn variant="contained" component="span" disableElevation>
                        {props.fileChooseState}
                      </Btn>
                    </label>
                  </Grid>
                  <Grid item>
                    {
                      props.fileChooseState === 'File Chosen' &&
                      <Btn
                        onClick={props.handleUpload}
                        size="medium"
                        variant="contained"
                        color="secondary">
                        <CloudUploadOutlinedIcon
                          fontSize="small"
                          className="uploadIcon" />
                         &nbsp; Upload
                      </Btn>
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {
                  (props.progress !== -1 && props.progress !== 100) ?
                    <LinearProgressWithLabel value={props.progress} /> :
                    (props.progress !== -1 && <p>Uploaded</p>)
                }
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Btn style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary" disabled={props.progress !== 100}>Submit</Btn>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

{/* <Tooltip title="New Material" placement="left">
        <Fab elevation={3} style={{ position: "fixed", bottom: "23vh", right: "3vw" }} aria-label="add" onClick={handleShow}>
          <LibraryAddOutlinedIcon style={{ color: '#2196f3' }} />
        </Fab>
      </Tooltip>
      <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="border-radius-1" >
        <Modal.Header>
          <h1 className="modal-title w-100 text-center">New Material</h1>
          <IconButton variant="outlined" onClick={handleClose} style={{ outline: "none" }}>
            <CloseOutlinedIcon style={{ color: '#ff1a1a' }} />
          </IconButton>
        </Modal.Header>
        <Modal.Body>
          <div className="uploadForm">
            <form method="post" action="/materials/new">
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
                      <MenuItem disabled={true} value=''>Select a Subject</MenuItem>
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
                      name="materialType"
                      required
                      value={type}
                      onChange={handleMaterialTypeChange}
                      label="Post Type"
                    >
                      <MenuItem disabled={true} value="">Select a type</MenuItem>
                      <MenuItem value={"Book"}>Book</MenuItem>
                      <MenuItem value={"Form"}>Form</MenuItem>
                      <MenuItem value={"Question Bank"}>Question Bank</MenuItem>
                      <MenuItem value={"Question Paper"}>Question Paper</MenuItem>
                      <MenuItem value={"Notes"}>Notes</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <TextField style={applyMargin}
                variant="outlined"
                type="text"
                name="author"
                fullWidth
                label="Author" />
              <TextField style={applyMargin}
                variant="outlined"
                required
                name="description"
                rows={4}
                fullWidth
                multiline
                label="Description" />
              <div className="file-section" style={applyMargin}>
                <input id='urls' type="hidden" name="url" value={JSON.stringify(props.url)} />
                <input
                  required
                  style={{ display: "none" }}
                  type="file"
                  id="contained-button-file"
                  name="file"
                  multiple
                  onChange={props.handleChange}
                />
                <label htmlFor="contained-button-file">
                  <Btn variant="contained" component="span" disableElevation>
                    {props.fileChooseState}
                  </Btn>
                </label>
                {props.fileChooseState === 'File Chosen' &&
                  <Btn
                    onClick={props.handleUpload}
                    size="medium"
                    variant="contained"
                    color="secondary"
                    style={{ float: "right", marginRight: "-15px" }}>
                    <CloudUploadOutlinedIcon
                      fontSize="small"
                      className="uploadIcon" />
                &nbsp; Upload
              </Btn>
                }
                {(props.progress !== -1 && props.progress !== 100) ?
                  <LinearProgressWithLabel value={props.progress} /> :
                  (props.progress !== -1 && <p>Uploaded</p>)
                }
              </div>
              {
                'Uploaded all files' === props.progress &&
                <Btn style={{ margin: "7px", width: "100%", height: "3rem", fontSize: "1.3rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Btn>
              }
            </form>
          </div>
        </Modal.Body>
      </Modal > */}

export default PostForm;
