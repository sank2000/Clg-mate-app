import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import NavigationBar from "./AppBar2";
// import Head from "./NavigationBar";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import DateFormat from 'dateformat';
import NewPost from "./../dialogs/NewPost";

function App() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        // fetch("/work").then(res => console.log(res.json()));
        axios.get("/posts")
            .then(function (response) {
                console.log(response.data);
                setPost([...response.data]);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])

    function data(post) {
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
    };

    return (
        <Fragment>
            <NavigationBar />
            {/* <Head /> */}
            <Container fluid>
                <h1>Posts</h1>
                <Row>
                    {post.map(data)}
                </Row>
                <NewPost />
            </Container>
        </Fragment >
    )

}

export default App;
