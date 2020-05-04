const express = require("express");
const bodyParser = require("body-parser");
const mongoose =  require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));


//mongoose.connect("mongodb://localhost:27017/Clg_mt",{ useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connect("mongodb+srv://admin-app:clgmateofficial@main-gv4yv.gcp.mongodb.net/FileDetails",{ useNewUrlParser: true , useUnifiedTopology: true});

const Post = mongoose.Schema(
    {
        title : String ,
        description : String,
        subName  : String,
        subCode  : String,
        file     : String,
        url      : String
    }
)

const post = mongoose.model("posts",Post);


app.get("/posts",function(req,res)
{
    console.log("request");
    post.find({},function(err,result)
    {
        if(!err)
        {
            res.send(result);
        }
        else
        {
            console.log(err);
        }
    })
})

app.post("/newpost",function(req,res)
{
    console.log(req.body);
    const p = new post(
        {
            title : req.body.title ,
            description : req.body.description,
            subName  : req.body.subName,
            subCode  : req.body.subCode,
            file     : req.body.file,
            url      : req.body.url,
        }
    )
    p.save(function(err)
    {
        if(!err)
        {
            res.send("<div><h1>Uploaded Successfully</h1><p>contact admin to remove files</p> </div>");
        }
    })
})

app.listen(5000,function(req,res)
{
    console.log("server started at port 5000");
})
