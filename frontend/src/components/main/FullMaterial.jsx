import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import DateFormat from 'dateformat';
import LinearProgress from '@material-ui/core/LinearProgress';

import NavigationBar from "../navigation/AppBar";
import MaterialCard from "../cards/MaterialCard";

function App() {
    const [post, setPost] = useState([]);
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        // fetch("/work").then(res => console.log(res.json()));
        axios.get("/materials/full")
            .then(function (response) {
                setPost([...response.data]);
                SetLoading(false);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [])

    function data(post, ind) {
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
            </Col>
        );
    }
    return (
        <Fragment>
            <NavigationBar />
            <Container fluid>
                <h1>Materials</h1>
                {loading && <LinearProgress />}
                <Row>
                    {post.map(data)}
                </Row>
            </Container>
        </Fragment >
    )

}

export default App;
