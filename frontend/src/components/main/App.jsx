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

import NavigationBar from "../navigation/AppBar";
import PostCard from "../cards/PostCard";
import MaterialCard from "../cards/MaterialCard";

function App() {
	const [post, setPost] = useState([]);
	const [material, setMaterial] = useState([]);
	const [click, setClick] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get("/posts")
			.then(function (response) {
				setPost([...response.data]);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				window.open("/oops", "_self");
			});
		axios.get("/materials")
			.then(function (response) {
				setMaterial([...response.data]);
			})
			.catch(function (error) {
				console.log(error);
				window.open("/oops", "_self");
			});
	})

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

	return (
		<Fragment>
			<NavigationBar />
			<Container fluid style={{ margin: '1rem 0px' }}>
				<Typography component="h1" variant='h3' align='center'>Posts</Typography>
				<Backdrop style={{ zIndex: "20000" }} open={loading}>
					<CircularProgress style={{ zIndex: "50000" }} color="inherit" />
				</Backdrop>
				<Grid container spacing={3}>
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
				<hr />
				<Typography component="h1" variant='h3' align='center'>Materials</Typography>
				<Grid container spacing={3}>
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
				{click && <Fragment>
					<Link to="/posts/new">
						<Tooltip title="New Post" placement="left">
							<Fab elevation={3} onClick={handleClick} style={{ position: "fixed", bottom: "12vh", right: "3vw" }} aria-label="add">
								<PostAddOutlinedIcon style={{ color: 'dodgerblue' }} />
							</Fab>
						</Tooltip>
					</Link>

					<Link to="/materials/new">
						<Tooltip title="New Material" placement="left">
							<Fab elevation={3} onClick={handleClick} style={{ position: "fixed", bottom: "21vh", right: "3vw" }} aria-label="add">
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
