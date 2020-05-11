import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import NavigationBar from "./AppBar";
import TT from "./Temp";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import DateFormat from 'dateformat';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialCard from "./MaterialCard";

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
				// handle error
				console.log(error);
			});
		axios.get("/materials")
			.then(function (response) {
				setMaterial([...response.data]);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, [])

	function data(post, ind) {
		return (
			<Col sm={12} md={6} lg={4} key={post._id}>
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
			</Col>
		);
	}

	function mat(post) {
		return (
			<Col sm={12} md={6} lg={4} key={post._id}>
				<MaterialCard
					title={post.title}
					author={post.author}
					description={post.description}
					subName={post.subName}
					subCode={post.subCode}
					file={post.file}
					url={post.url}
					postBy={post.postBy}
					postedOn={DateFormat((new Date(post.updatedAt)), "d-mmm-yy, h:mm TT")}
				/>
			</Col>)
	}

	function handleClick() {
		setClick(!click);
	}

	return (
		<Fragment>
			<NavigationBar />
			{/* <TT /> */}
			<Container fluid>
				<h1>Posts</h1>
				<Backdrop style={{ zIndex: "20000" }} open={loading}>
					<CircularProgress style={{ zIndex: "50001" }} color="inherit" />
				</Backdrop>
				<Row>
					{post.map(data)}
				</Row>
				<Link to="/fullpost">
					<Button variant="contained" color="primary" style={{ marginLeft: "50px" }}>
						show more
				</Button>
				</Link>
				<hr></hr>
				<h1>Materials</h1>
				<Row>
					{material.map(mat)}
				</Row>
				{click && <Fragment>
					<Link to="/posts/new">
						<Tooltip title="New Post" placement="left">
							<Fab color="primary" onClick={handleClick} style={{ position: "fixed", bottom: "12vh", right: "3vw" }} aria-label="add">
								<PostAddOutlinedIcon />
							</Fab>
						</Tooltip>
					</Link>

					<Link to="/materials/new">
						<Tooltip title="New Material" placement="left">
							<Fab color="primary" onClick={handleClick} style={{ position: "fixed", bottom: "21vh", right: "3vw" }} aria-label="add">
								<LibraryAddOutlinedIcon />
							</Fab>
						</Tooltip>
					</Link>
				</Fragment>}
				<Fab color="primary" onClick={handleClick} style={{ position: "fixed", bottom: "3vh", right: "3vw" }} aria-label="add">
					{click ? <CancelIcon /> : <AddIcon />}
				</Fab>
			</Container >
		</Fragment >
	)

}

export default App;
