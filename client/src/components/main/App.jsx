import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import Container from "@material-ui/core/Container";
import DateFormat from 'dateformat';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Backdrop from "@material-ui/core/Backdrop";
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container2 from "../containers/FlexContainer";

import NavigationBar from "../navigation/AppBar";
import PostCard from "../cards/PostCard";
import MaterialCard from "../cards/MaterialCard";

import Add from "./Add";

function App() {
	const [post, setPost] = useState([]);
	const [material, setMaterial] = useState([]);
	const [loading, setLoading] = useState(true);
	const [postsAvailable, setPostsAvailable] = useState(false);
	const [materialsAvailable, setMaterialsAvailable] = useState(false);

	useEffect(() => {
		axios.get("/posts")
			.then(function (response) {
				setPost([...response.data]);
				setLoading(false);
				if (response.data.length !== 0) {
					setPostsAvailable(true);
				}
			})
			.catch(function (error) {
				console.log(error);
				// window.open("/oops", "_self");
			});
		axios.get("/materials")
			.then(function (response) {
				setMaterial([...response.data]);
				if (response.data.length !== 0) {
					setMaterialsAvailable(true);
				}
			})
			.catch(function (error) {
				console.log(error);
				// window.open("/oops", "_self");
			});
	}, [])

	function data(post, ind) {
		return (
			<Grid item xs={12} sm={6} md={4} lg={4} key={post._id}>
				<PostCard
					doc_id={post._id}
					postedById={post.authorId}
					title={post.title}
					postType={post.postType}
					description={post.description}
					subject={post.subName}
					dueDate={DateFormat((new Date(post.dueDate)), "d-mmm-yyyy")}
					postedBy={post.author}
					authorType={post.authorType}
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
					doc_id={post._id}
					title={post.title}
					author={post.author}
					description={post.description}
					materialType={post.materialType}
					subName={post.subName}
					subCode={post.subCode}
					file={post.file}
					url={post.url}
					postBy={post.postBy}
					postByType={post.postByType}
					postedById={post.postById}
					postedOn={DateFormat((new Date(post.updatedAt)), "d-mmm-yy, h:mm TT")}
				/>
			</Grid>
		);
	}


	function NotAvailable(props) {
		return (
			<Container2 height='60vh'>
				<img src='./images/bulb.png' style={{ width: '7em', height: '7em', padding: '1rem' }} alt='' />
				<h3>{props.type} you add appear here..</h3>
			</Container2>
		)
	}

	return (
		<Fragment>
			<NavigationBar />
			<Container style={{ padding: '1rem' }} >
				<Typography component="h2" variant='h3' align='center'>Posts</Typography>
				<Backdrop style={{ zIndex: "20000" }} open={loading}>
					<CircularProgress style={{ zIndex: "50000" }} color="primary" />
				</Backdrop>
				{
					postsAvailable ? <Fragment>
						<Grid container
							spacing={3}
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
							<Button onClick={() => window.open('/fullpost', '_self')} variant="contained" color="primary">
								Show more
						</Button>
						</div>
					</Fragment> :
						<NotAvailable type="Posts" />
				}
				<hr />
				<Typography component="h1" variant='h3' align='center'>Materials</Typography>
				{
					materialsAvailable ? <Fragment>
						<Grid container
							spacing={3}
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
							<Button onClick={() => window.open('/fullmaterial', '_self')} variant="contained" color="primary">
								Show more
				    </Button>
						</div>
					</Fragment> :
						<NotAvailable type="Materials" />
				}
				<Add />
			</Container >
		</Fragment >
	)

}
export default App;
