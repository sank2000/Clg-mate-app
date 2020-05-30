import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import Container from "@material-ui/core/Container";
import DateFormat from 'dateformat';
import Grid from '@material-ui/core/Grid';
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
  const [found, setFound] = useState(true);

  function handleCancel() {
    setSearch("");
  }

  function SearchText(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    axios.post("/materials/full")
      .then(function (response) {
        setPost([...response.data]);
        SetLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  function data(post, ind) {
    return (
      <Grid item xs={12} sm={6} md={4} lg={4} key={post._id}>
        <MaterialCard
          doc_id={post._id}
          title={post.title}
          author={post.author}
          description={post.description}
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

  const getSearch = async () => {
    let params = new URLSearchParams({ search: search });
    if (search) {
      const result = await axios.post("/materials/search", params);
      return result;
    }
    else {
      const result = await axios.post("/materials/full");
      return result;
    }
  }

  const handleSearch = async () => {
    SetLoading(true);
    const response = await getSearch();
    if (response.data.length === 0) {
      setFound(false);
    }
    else {
      setPost([...response.data]);
      setFound(true);
    }
    SetLoading(false);

  }

  function keyEntered(event) {
    if (event.which === 13 || event.keyCode === 13) {
      handleSearch();
      return false;
    }
    return true;
  };

  function NoRecord() {
    return (
      <Fragment>
        <h1>No Record Found !!!</h1>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <NavigationBar title="All materials" />
      <Container maxWidth="xl" className="fullPostHead">
        <Grid container>
          <Grid item lg={9} xs={6}><h1 style={{ display: "inline" }}>Materials</h1></Grid>
          <Grid item>
            <FormControl>
              <OutlinedInput className="searchButton"
                placeholder="Title"
                id="input-with-icon-adornment"
                value={search}
                onChange={SearchText}
                onKeyPress={keyEntered}
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
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
        {loading && <LinearProgress />}
        {
          found ?
            <Grid container spacing={3}>
              {post.map(data)}
            </Grid> : <NoRecord />
        }
      </Container>
    </Fragment >
  )

}

export default App;
