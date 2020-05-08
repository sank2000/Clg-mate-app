import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import Head from "./NavigationBar";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";

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
                    dueDate={new Date(post.dueDate).toLocaleDateString()}
                    url={post.url}
                    file={post.file}
                />
            </Col>
        );
    };

    return (
        <Fragment>
            <Head />
            <Container fluid>
                <Row>
                    {post.map(data)}
                </Row>
            </Container>
        </Fragment>
    )

}

export default App;
