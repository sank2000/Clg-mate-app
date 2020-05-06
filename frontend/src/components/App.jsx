import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import Head from "./NavigationBar";
import NewCard from "./NewCard";

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
            <NewCard
                key={post._id}
                title={post.title}
                postType={post.postType}
                description={post.description}
                subject={post.subName}
                dueDate={new Date(post.dueDate).toLocaleDateString()}
                url = {post.url}
                file = {post.file}
            />
        );
    };

    return (
        <Fragment>
            <Head />
            {post.map(data)}
            {/* <NewCard /> */}
        </Fragment>
    )

}

export default App;


/* <div>
{ response.data.map((post) =>
  {
      <Card
      title = {post.title}
      description ={post.description}
      subName = {post.subName}
      subCode = {post.subCode}
      file = {post.file}
      url = {post.url}
      ></Card>
  })  }
</div> */
