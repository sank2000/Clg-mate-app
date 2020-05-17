import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Container } from "react-bootstrap";
import DateFormat from 'dateformat';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Backdrop from "@material-ui/core/Backdrop";
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container2 from "../containers/FlexContainer";

import NavigationBar from "../navigation/AppBar";
import PostCard from "../cards/PostCard";
import MaterialCard from "../cards/MaterialCard";

function App() {
	const [post, setPost] = useState([]);
	const [material, setMaterial] = useState([]);
	const [click, setClick] = useState(false);
	const [loading, setLoading] = useState(true);
	const [postEmty, setPostEmty] = useState(false);
	const [materialEmty, setMaterialEmty] = useState(false);

	useEffect(() => {
		axios.get("/posts")
			.then(function (response) {
				setPost([...response.data]);
				setLoading(false);
				if (response.data.length !== 0) {
					setPostEmty(true);
				}
			})
			.catch(function (error) {
				console.log(error);
				window.open("/oops", "_self");
			});
		axios.get("/materials")
			.then(function (response) {
				setMaterial([...response.data]);
				if (response.data.length !== 0) {
					setMaterialEmty(true);
				}
			})
			.catch(function (error) {
				console.log(error);
				window.open("/oops", "_self");
			});
	}, [])

	function data(post, ind) {
		return (
			<Grid item xs={12} sm={6} md={4} lg={4} key={post._id}>
				<PostCard
					title={post.title}
					postType={post.postType}
					description={post.description}
					subject={post.subName}
					dueDate={DateFormat((new Date(post.dueDate)), "d-mmm-yyyy")}
					postedBy={post.author}
					url={post.url}
					file={post.file}
					postedOn={DateFormat((new Date(post.updatedAt)), "d-mmm-yy, h:mm TT")}
				/>
			</Grid>
		);
	}

	function mat(post) {
		return (
			<Grid item xs={12} sm={6} md={4} lg={4} key={post._id}>
				<MaterialCard
					title={post.title}
					author={post.author}
					description={post.description}
					materialType={post.materialType}
					subName={post.subName}
					subCode={post.subCode}
					file={post.file}
					url={post.url}
					postBy={post.postBy}
					postedOn={DateFormat((new Date(post.updatedAt)), "d-mmm-yy, h:mm TT")}
				/>
			</Grid>
		);
	}

	function handleClick() {
		setClick(!click);
	}

	function Empt(props) {
		return <Container2 background='transparent' height='60vh'>
			<img src='./images/bulb.png' style={{ width: '7em', height: '7em', padding: '1rem' }} alt='' />
			<h3>{props.type} you add appear here..</h3>
		</Container2>
	}

	return (
		<Fragment>
			<NavigationBar />
			<Container style={{ padding: '1rem' }} fluid>
				<Typography component="h2" variant='h3' align='center'>Posts</Typography>
				<Backdrop style={{ zIndex: "20000" }} open={loading}>
					<CircularProgress style={{ zIndex: "50000" }} color="primary" />
				</Backdrop>
				{postEmty ? <Fragment>
					<Grid container justify="space-evenly"
						spacing={3}
						alignItems="center"
						style={{
							paddingTop: '1rem',
							paddingBottom: '1rem'
						}}>
						{post.map(data)}
					</Grid>
					<div style={{
						display: 'flex',
						justifyContent: 'center',
						justifyItems: 'center'
					}}>
						<Link to="/fullpost" className="linkStyle" >
							<Button variant="contained" color="primary">
								Show more
							</Button>
						</Link>
					</div>
				</Fragment> : <Empt type="Posts" />}
				<hr />
				<Typography component="h1" variant='h3' align='center'>Materials</Typography>
				{materialEmty ? <Fragment>
					<Grid container justify="space-evenly"
						spacing={3}
						alignItems="center"
						style={{
							paddingTop: '1rem',
							paddingBottom: '1rem'
						}}>
						{material.map(mat)}
					</Grid>
					<div style={{
						display: 'flex',
						justifyContent: 'center',
						justifyItems: 'center'
					}}>
						<Link to="/fullmaterial" className="linkStyle">
							<Button variant="contained" color="primary">
								Show more
				                </Button>
						</Link>
					</div>
				</Fragment> : <Empt type="Materials" />}
				{click && <Fragment>
					<Link to="/posts/new">
						<Tooltip title="New Post" placement="left">
							<Fab elevation={3} onClick={handleClick} style={{ position: "fixed", bottom: "13vh", right: "3vw" }} aria-label="add">
								<PostAddOutlinedIcon style={{ color: 'dodgerblue' }} />
							</Fab>
						</Tooltip>
					</Link>

					<Link to="/materials/new">
						<Tooltip title="New Material" placement="left">
							<Fab elevation={3} onClick={handleClick} style={{ position: "fixed", bottom: "23vh", right: "3vw" }} aria-label="add">
								<LibraryAddOutlinedIcon style={{ color: 'dodgerblue' }} />
							</Fab>
						</Tooltip>
					</Link>
				</Fragment>}
				<Fab elevation={3} onClick={handleClick} style={{ position: "fixed", bottom: "3vh", right: "3vw" }} aria-label="add">
					{click ? <ClearIcon style={{ color: 'dodgerblue' }} /> : <AddIcon style={{ color: 'dodgerblue' }} />}
				</Fab>
			</Container >
		</Fragment >
	)

}
export default App;
