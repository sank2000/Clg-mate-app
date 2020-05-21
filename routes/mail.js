const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
require('dotenv');

const User = require('../models/User');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS
	}
});

router.post("/forgot", function (req, res) {
	User.findOne({ unique_id: req.body.id }, function (err, result) {
		if (err) { console.log(err); return; }
		if (!result) {
			res.json({
				find: false
			});
		}
		res.json({
			find: true,
			mail: result.email
		});
	});
});

router.post("/feedback", function (req, res) {
	User.findById(req.session.user, "name", function (err, result) {
		if (err) { console.log(err); return; }
		let mailOptions = {
			from: `"${result.name} via Collegemate Feedback" collegematewebapp@gmail.com`,
			to: "santhoshvelr@gmail.com,akrishnamoorthy007@gmail.com",
			subject: "FeedBack on Collegemate App from " + result.name,
			// text: req.body.content,
			html:
				`<h1>${req.body.title}</h1>
					<p>${req.body.content}</p>
				`
		}
		transporter.sendMail(mailOptions, function (err, dat) {
			if (err) {
				console.log(err);
				res.json(
					{
						msg: "Unable to send Feedback",
						done: false
					}
				);
			}
			else {
				res.json({
					msg: "Feedback sent Successfully",
					done: true
				}
				);
			}
		});
	});
});

router.post("/forgot/sendmail", function (req, res) {
	User.findOne({ unique_id: req.body.id }, function (err, result) {
		if (err) { console.log(err); return; }
		if (result) {
			let mailOptions =
			{
				from: '"Collegemate App" collegematewebapp@gmail.com',
				to: result.email,
				subject: "Your Collegemate Sign in password",
				html: `
					<h3>Your Collegemate sign in password is:</h3> 
					<h1>${result.password}</h1>
					<h4>If you don't know why you're getting this email, consider changing your password to avoid your account being misused/ locked.</h4> `
			}

			transporter.sendMail(mailOptions, function (err, dat) {
				if (err) {
					console.log(err);
					res.json({
						msg: "Unable to send Email",
						done: false
					}
					);
				}
				else {
					res.json({
						msg: "Mail sent Successfully",
						done: true
					}
					);
				}
			});
		}
		else {
			res.json({
				find: false,
				done: false,
				msg: "Unable to send Email",
			});
		}
	});
});

module.exports = router;
