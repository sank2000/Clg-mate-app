import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '../../messages/alerts/alert';
import Fdelete from '../../../firebaseFileDelete';


export default (props) => {
	const [open, setOpen] = useState(false);

	const AhandleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const handleClick = async () => {
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
				setOpen(true);
			}

		}
		else if (props.type === "material") {
			let prms = new URLSearchParams({ id: props.data.doc_id });
			const result = await axios.post("/materials/delete", prms);
			if (result.data.deleted) {
				Fdelete(props.data.file, "materials");
			}
			else {
				setOpen(true);
			}
		}
		else {
			return;
		}
	}

	return (
		<>
			<IconButton style={{ padding: '8px', color: "#ff1a1a" }} onClick={handleClick}>
				<DeleteOutlinedIcon />
			</IconButton>
			<Snackbar open={open} autoHideDuration={6000} onClose={AhandleClose}>
				<Alert onClose={AhandleClose} severity="error">
					Failed to remove {props.type}
				</Alert>
			</Snackbar>
		</>
	);
}
