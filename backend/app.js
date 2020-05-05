require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose =  require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));


//mongoose.connect("mongodb://localhost:27017/Clg_mt",{ useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true});

const Post = mongoose.Schema(
    {
        title : String ,
        author : String,
        description : String,
        subName  : String,
        subCode  : String,
        DueDate  : Date ,
        file     : String,
        url      : String,
        date     : 
        {
            type : Date,
            default : Date.now
        }
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
            author : req.body.author,
            description : req.body.description,
            subName  : req.body.subName,
            subCode  : req.body.subCode,
            DueDate  : new Date(req.body.DueDate),
            file     : req.body.file,
            url      : req.body.url,
        }
    )
    p.save(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else{
           // res.send("<div><h1>Uploaded Successfully</h1><p>contact admin to remove files</p> </div>");
           res.redirect("/");
        }
    })
})

app.listen(5000,function(req,res)
{
    console.log("server started at port 5000");
})
