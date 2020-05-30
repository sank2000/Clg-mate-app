import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import Container from "@material-ui/core/Container";
import DateFormat from 'dateformat';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';

import NavigationBar from "../navigation/AppBar";
import PostCard from "../cards/PostCard";

import { makeStyles, useTheme } from '@material-ui/core/styles';

function ExpiredPosts() {
  const [post, setPost] = useState([]);
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    },
  });
  const classes = useStyles();


  useEffect(() => {
    let params = new URLSearchParams({ type: type });
    axios.post("/posts/expired", params)
      .then(function (response) {
        setPost([...response.data]);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        // window.open("/oops", "_self");
      });
    // eslint-disable-next-line
  }, []);

  const handleChange = event => {
    setType(event.target.value);
  };

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

  const getFilter = async () => {
    let params = new URLSearchParams({ type: type });
    const result = await axios.post("/posts/full", params);
    return result;
  }

  const handleFilter = async () => {
    setLoading(true);
    const response = await getFilter();
    setPost([...response.data]);
    setLoading(false);
  }

  return (
    <Fragment>
      <NavigationBar title="Expired posts" />
      <Container maxWidth="xl" className={classes.root}>
        <Grid container>
          <Grid item lg={9} xs={6}><h1 style={{ display: "inline" }}>Posts</h1></Grid>
          <Grid item>
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
                <MenuItem value={"All"}>All</MenuItem>
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
      <Container maxWidth="xl" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
        {loading && <LinearProgress />}
        <Grid container spacing={3}>
          {post.map(data)}
        </Grid>
      </Container>
    </Fragment >
  );
}

export default ExpiredPosts;
