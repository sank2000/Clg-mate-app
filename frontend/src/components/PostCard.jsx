import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from "./Card";
import Head from "./NavigationBar";

function PostCard () 
{
    const [post,setPost] = useState(
        [
        {
        title : "",
        description : "",
        subName : "",
        subCode : "",
        file : "",
        url : ""
    }]);

    
    useEffect(()=>
    {
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
    },[])
        
        function data(post)
        {
            return (
                <Card 
                title = {post.title}
                description ={post.description}
                subName = {post.subName}
                subCode = {post.subCode}
                file = {post.file}
                url = {post.url}
                ></Card>       
                )   
        }
        
        return (
            <div>
                <Head />
                { post.map(data) }
            </div>
            )
    
}

export default PostCard;


{/* <div>
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
</div> */}