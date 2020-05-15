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
		if (!err) {
			if (result) {
				res.json(
					{
						find: true,
						mail: result.email
					}
				);
			}
			else {
				res.json({
					find: false
				}
				);
			}
		}
		else {
			console.log(err);
		}
	});
});

router.post("/feedback", function (req, res) {
	User.findById(req.session.user, "name", function (err, result) {
		if (err) {
			console.log(err);
		}
		else {
			let mailOptions = {
				from: "collegematewebapp@gmail.com",
				to: "santhoshvelr@gmail.com,akrishnamoorthy007@gmail.com",
				subject: "FeedBack on Collegemate App from " + result.name + req.body.title,
				text: req.body.content
				// html: "<b>secret</b>" 
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
		}
	});
});

router.post("/forgot/sendmail", function (req, res) {
	User.findOne({ unique_id: req.body.id }, function (err, result) {
		if (!err) {
			if (result) {
				let mailOptions =
				{
					from: "collegematewebapp@gmail.com",
					to: result.email,
					subject: "Your Collegemate Sign in password",
					text: `Your Collegemate sign in password is: ${result.password}. If you don't know why you're getting this email, consider changing your password to avoid your account being misused/ locked.`
					// html: "<b>secret</b>" 
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
				res.json(
					{
						find: false,
						done: false,
						msg: "Unable to send Email",
					}
				);
			}

		}
		else {
			console.log(err);
		}
	});
});

module.exports = router;
