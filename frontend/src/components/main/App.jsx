import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import NavigationBar from "./AppBar";
import TT from "./Temp";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import DateFormat from 'dateformat';
import NewPost from "./../dialogs/NewPost";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
    const [post, setPost] = useState([]);
    const [click,setClick] = useState(false);
    const [loading,SetLoading] = useState(true);

    useEffect(() => {
        // fetch("/work").then(res => console.log(res.json()));
        axios.get("/posts")
            .then(function (response) {
                console.log(response.data);
                setPost([...response.data]);
                SetLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [])

    function data(post,ind) {
        if(ind < 6)
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
    
    function handleClick() 
    { 
        setClick(!click);
     }
    return (
        <Fragment>
            <NavigationBar />
            <TT />
            <Container fluid>
                <h1>Posts</h1>
                {loading && <LinearProgress />}
                <Row>
                    {post.map(data)}
                </Row>
                <Link to="/fullpost">
                    <Button variant="contained" color="primary" style={{ marginLeft : "50px" }}>
                        show more
                    </Button>
                </Link>
                <h1>Materials</h1>
                {click && <Fragment>
                    <Link to="/newpost">
                    <Tooltip title="New Post" placement="left">
                        <Fab color="primary" onClick={handleClick} style={{ position: "fixed", bottom: "12vh", right: "3vw" }} aria-label="add">
                            <PostAddOutlinedIcon />
                        </Fab>
                    </Tooltip>
                    </Link>
                 <Tooltip title="New Material" placement="left">
                    <Fab color="primary" onClick={handleClick} style={{ position: "fixed", bottom: "21vh", right: "3vw" }} aria-label="add">
                            <LibraryAddOutlinedIcon />
                    </Fab>
                 </Tooltip>
                 </Fragment> }
                 <Fab color="primary" onClick={handleClick} style={{ position: "fixed", bottom: "3vh", right: "3vw" }} aria-label="add">
                          {click ? <CancelIcon /> : <AddIcon /> }
                    </Fab>
            </Container>
        </Fragment >
    )

}

export default App;
