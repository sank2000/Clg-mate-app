var express = require('express');
const nodemailer = require("nodemailer");
var router = express.Router();

const User = require('../models/User');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: "collegematewebapp@gmail.com",
      pass: "clgmateofficial"
    }
  });

router.post("/",function(req,res)
{
    User.findOne({unique_id : req.body.id},function(err,result)
    {
        if(!err)
        {
            if(result)
            {
                res.json(
                    {
                         find : true,
                         mail : result.email
                    }
                );
            }
            else
            {
               res.json(
                   {
                        find : false
                   }
               );
            }

        }
        else
        {
            console.log(err);
        }
    })
});

router.post("/sendmail",function(req,res)
{

    User.findOne({unique_id : req.body.id},function(err,result)
    {
        if(!err)
        {
            if(result)
            {
                let mailOptions =
                {
                        from: "collegematewebapp@gmail.com", 
                        to: result.email,
                        subject: "Forgot Password for clgmate app", 
                        text: "Here is your password ................"+result.password,
                        // html: "<b>secret</b>" 
                }

                transporter.sendMail(mailOptions,function(err,dat)
                {
                        if(err)
                        {
                            console.log(err);
                            res.json(
                                {
                                     msg : "Unable to send Email",
                                     done : false
                                }
                            );
                        }
                        else{
                            res.json(
                                {
                                     msg : "Mail Sended Successfully",
                                     done : true
                                }
                            );
                        }
                });
            }
            else
            {
               res.json(
                   {
                        find : false,
                        done : false,
                        msg : "Unable to send Email",
                   }
               );
            }

        }
        else
        {
            console.log(err);
        }
    });
    

});












module.exports = router;