const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}))

app.get("/work",function(req,res)
{
    res.send({
        name : "san"
    });
})

app.post("/up",function(req,res)
{
    console.log(req.body);
    res.send({
        name : "working"
    });
})

app.post("/newpost",function(req,res)
{
    console.log(req.url);
    console.log(req.body);
    res.send("<div><h1>Uploaded Successfully</h1><p>contact admin to remove files</p> </div>");
})

app.listen(5000,function(req,res)
{
    console.log("server started at port 5000");
})
