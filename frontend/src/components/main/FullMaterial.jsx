import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import DateFormat from 'dateformat';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import IconButton from "@material-ui/core/IconButton";
import NavigationBar from "../navigation/AppBar";
import MaterialCard from "../cards/MaterialCard";

function App() {
    const [post, setPost] = useState([]);
    const [loading, SetLoading] = useState(true);
    const [search, setSearch] = useState("");

    function handleSearch() {
        console.log(search);
    }
     
    function handleCancel()
    {
        setSearch("");
    }

    function SearchText(event) {
        setSearch(event.target.value);
    }

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
            <Container fluid className="fullPostHead">
                <Row>
                    <Col lg={9} xs={6}><h1 style={{ display: "inline" }}>Materials</h1></Col>
                    <Col >
                    <FormControl>
                        <OutlinedInput className="searchButton"
                        placeholder ="search"
                        id="input-with-icon-adornment"
                        value={search}
                        onChange={SearchText}
                        style={{ borderRadius: "2rem" }}
                        startAdornment={
                            <InputAdornment position="start">
                            <IconButton size="small" onClick={handleSearch}>
                                <SearchOutlinedIcon />
                            </IconButton>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end" onClick={handleCancel}>
                            <IconButton size="small">
                                <ClearOutlinedIcon />
                            </IconButton>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
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
