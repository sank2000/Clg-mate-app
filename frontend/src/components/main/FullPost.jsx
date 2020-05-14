import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Container } from "react-bootstrap";
import DateFormat from 'dateformat';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FilterListIcon from '@material-ui/icons/FilterList';

import NavigationBar from "../navigation/AppBar";
import PostCard from "../cards/PostCard";

function App() {
	const [post, setPost] = useState([]);
	const [type, setType] = useState("All");
	const [loading, SetLoading] = useState(true);

	useEffect(() => {
		let params = new URLSearchParams({ type: type });
		axios.post("/posts/full", params)
			.then(function (response) {
				setPost([...response.data]);
				SetLoading(false);

			})
			.catch(function (error) {
				console.log(error);
				window.open("/oops", "_self");
			});
	},[])

	const handleChange = event => {
		setType(event.target.value);
	};

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


	const getFilter = async () => {
		let params = new URLSearchParams({ type: type });
		const result = await axios.post("/posts/full", params);
		return result;
	}

	const handleFilter = async () => {
		SetLoading(true);
		const response = await getFilter();
		setPost([...response.data]);
		SetLoading(false);

	}

	return (
		<Fragment>
			<NavigationBar title="All Posts" />
			<Container fluid className="fullPostHead">
				<Grid container>
					<Grid item lg={9} xs={6}><h1 style={{ display: "inline" }}>Posts</h1></Grid>
					<Grid item >
						<FormControl variant='outlined' style={{ minWidth: 140 }} size="small" className="filterSelect" >
							<InputLabel>
								Post Type
                                </InputLabel>
							<Select
								name="postType"
								value={type}
								onChange={handleChange}
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
						<Button className="filterButton"
							variant="contained"
							color="primary"
							startIcon={<FilterListIcon />}
							onClick={handleFilter}
						>Apply Filter</Button>
					</Grid>
				</Grid>
			</Container>
			<Container style={{ paddingTop: '1rem', paddingBottom: '1rem' }} fluid>
				{loading && <LinearProgress />}
				<Grid container spacing={3}>
					{post.map(data)}
				</Grid>
			</Container>
		</Fragment >
	);
}

export default App;
