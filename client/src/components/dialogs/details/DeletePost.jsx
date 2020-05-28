import React, { useState } from 'react';
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '../../messages/alerts/alert';
import Fdelete from '../../../firebaseFileDelete';
import { Spinner } from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import Alert2 from "@material-ui/lab/Alert";

import AuthApi from "../../auth/AuthApi";

export default (props) => {
	const [open, setOpen] = useState(false);
	const [Aopen, setAOpen] = useState(false);
	const [load, setLoad] = useState(false);
	const [loading, setLoading] = useState(false);
	const authApi = React.useContext(AuthApi);
	const user = authApi.auth;

	const handleClickOpen = () => {
		if (user.state !== "verified") {
			setLoading(true);
		}
		else {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const AhandleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setAOpen(false);
	};

	const handleClick = async () => {
		setLoad(true);
		if (props.type === 'post') {
			let prms = new URLSearchParams({ id: props.data.doc_id });
			const result = await axios.post("/posts/delete", prms);
			if (result.data.deleted) {
				if (props.data.file[0].length === 0) {
					window.location.reload();
				}
				else {
					Fdelete(props.data.file, "posts");
				}
			}
			else {
				setAOpen(true);
			}

		}
		else if (props.type === "material") {
			let prms = new URLSearchParams({ id: props.data.doc_id });
			const result = await axios.post("/materials/delete", prms);
			if (result.data.deleted) {
				Fdelete(props.data.file, "materials");
			}
			else {
				setAOpen(true);
			}
		}
		else {
			return;
		}
	}

	return (
		<>
			<IconButton style={{ padding: '8px', color: "#ff1a1a" }} onClick={handleClickOpen}>
				<DeleteOutlinedIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{`Do you really want to delete this ${props.type}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be reversed. All the files attached to this {props.type} will also be deleted. Proceed with caution.
          </DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
          </Button>
					<Button onClick={handleClick} color="secondary" autoFocus>
						Yes&nbsp;{load && <Spinner animation="grow" variant="danger" size="sm" />}
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar open={Aopen} autoHideDuration={6000} onClose={AhandleClose}>
				<Alert onClose={AhandleClose} severity="error">
					Failed to remove {props.type}
				</Alert>
			</Snackbar>
			<Backdrop style={{ zIndex: "20000" }} open={loading}>
				<Alert2
					onClose={() => {
						setLoading(false);
					}}
					variant="filled"
					severity="error"
					style={{ zIndex: "50000" }}
				>
					In order to access this you need to get verified &nbsp; — &nbsp; <a href="/verify">verify now</a>
				</Alert2>
			</Backdrop>

		</>
	);
}
