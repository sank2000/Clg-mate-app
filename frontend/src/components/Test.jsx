import React, { useState } from "react";
import axios from "axios";

function test()
{
    function handle()
    {
        axios.get("/work")
        .then(function (response) {
            // handle success
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
       // fetch("/work").then(res => console.log(res.json()));
    }
    return (
        <div>
            <h1>frontend working</h1>
            <button onClick={handle}>Click</button>
            <form action="/up" method="post">
                <input name="name" placeholder="name"></input>
                <button type="submit">submit</button>
            </form>
        </div>   
    )
}


export default test;