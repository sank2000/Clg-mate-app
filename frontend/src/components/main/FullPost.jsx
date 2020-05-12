import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import DateFormat from 'dateformat';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';

import NavigationBar from "../navigation/AppBar";
import PostCard from "../cards/PostCard";

function App() {
    const [post, setPost] = useState([]);
    const [type, setType] = useState("All");
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        // fetch("/work").then(res => console.log(res.json()));
        let prms = new URLSearchParams({ type: type });
        axios.post("/posts/full", prms)
            .then(function (response) {
                setPost([...response.data]);
                SetLoading(false);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                window.open("/oops", "_self");
            });
    }, [])

    const handleChange = event => {
        setType(event.target.value);
    };

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


    const getFilter = async () => {
        let prms = new URLSearchParams({ type: type });
        const result = await axios.post("/posts/full", prms);
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
            <NavigationBar />
            <Container fluid className="fullPostHead">
                <Row>
                    <Col lg={9} xs={6}><h1 style={{ display: "inline" }}>Posts</h1></Col>
                    <Col >
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
                                <MenuItem value={"Other"}>Other</MenuItem>
                                <MenuItem value={"Notes"}>Notes</MenuItem>
                                <MenuItem value={"Assignment"}>Assignment</MenuItem>
                            </Select>
                        </FormControl>
                        <Button className="filterButton"
                            variant="contained"
                            color="primary"
                            startIcon={<FilterListIcon />}
                            onClick={handleFilter}
                        >Apply Filter</Button>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                {loading && <LinearProgress />}
                <Row>
                    {post.map(data)}
                </Row>
            </Container>
        </Fragment >
    )

}

export default App;
