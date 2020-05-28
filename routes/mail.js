const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 5;
require('dotenv');

const User = require('../models/User');
const OTP = require("../models/OTP");
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS
	}
});


router.post("/feedback", function (req, res) {
	User.findById(req.session.user, "name", function (err, result) {
		if (err) {
			console.log(err);
		}
		else {
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
		}
	});
});

router.post("/forgot", function (req, res) {
	User.findOne({ unique_id: req.body.id }, function (err, result) {
		if (!err) {
			if (result) {
				res.json(
					{
						find: true,
						mail: result.email,
						unique_id: result.unique_id,
						doc_id: result._id
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


router.post("/forgot/sendmail", function (req, res) {
	var num = Math.floor(Math.random() * 900000) + 100000;
	OTP.findOneAndUpdate({ doc_id: req.body.doc_id }, { OTP: num }, function (err, result) {
		if (err) {
			console.log(err);
		}
		else {
			if (result === null) {
				const nOtp = new OTP(
					{
						doc_id: req.body.doc_id,
						OTP: num
					}
				);
				nOtp.save(function (err) {
					if (err) {
						console.log(err);
					}
				});
			}
		}
	});

	let mailOptions;

	if (req.body.mailType === "reset") {
		mailOptions = {
			from: '"Collegemate App" collegematewebapp@gmail.com',
			to: req.body.mail,
			subject: "OTP to reset password",
			html: `
		<h3>Your OTP to reset  password is:</h3> 
		<h1>${num}</h1>
		<h4>If you don't know why you're getting this email, consider changing your password to avoid your account being misused/ locked.</h4>
		`
		};
	}
	else {
		mailOptions = {
			from: '"Collegemate App" collegematewebapp@gmail.com',
			to: req.body.email,
			subject: "OTP to verify Email",
			html: `
		<h3>Your OTP to verify Email is:</h3> 
		<h1>${num}</h1>
		<h4>If you don't know why you're getting this email, consider changing your password to avoid your account being misused/ locked.</h4>
		`
		};
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

});

router.post("/forgot/verify", function (req, res) {
	OTP.findOne({ doc_id: req.body.doc_id, OTP: req.body.OTP }, function (err, result) {
		if (!err) {
			if (result) {
				if (req.body.mailType === "verify") {
					User.findOneAndUpdate({ _id: req.body.doc_id }, { state: "verified" }, function (err, result) {
						if (err) {
							console.log(err);
						}
						else {
							if (result === null) {
								console.log("account not found");
								res.json({
									verified: false
								});
							}
						}
					});
					res.json({
						verified: true
					});
				}
				else {
					res.json({
						verified: false
					});
				}
			}
		}
		else {
			console.log(err);
		}
	})
});

router.post("/forgot/reset", function (req, res) {
	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
		User.findByIdAndUpdate({ _id: req.body.doc_id }, { password: hash }, function (err, result) {
			if (err) {
				res.json({
					changed: false
				});
			} else {
				res.json({
					changed: true
				});
			}
		}
		);
	});
});

module.exports = router;
