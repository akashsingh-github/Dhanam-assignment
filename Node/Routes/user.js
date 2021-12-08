const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


require('dotenv').config();

const user = require('../Model/user');

router.post('/register', async (req, res) => {
    const {name, email, password: plaintext} = req.body;
    if(!email || typeof email != 'string'){
        return res.json({status: 'error', error: 'Invalid email'})
    }
    if(!plaintext || typeof plaintext != 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }
    if(plaintext.length < 8){
        return res.json({status: 'error', error: 'Password should greater than 6 character'})
    }
    const password = await bcrypt.hash(plaintext, 10);
    try{
        const newUser = await user.create({
            name,
            email,
            password
        })
        console.log("New user created successfully!!!");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "akash.assignments@gmail.com",
                pass: process.env.MAIL_PASS
            }
        });
        var mailOptions = {
            from: 'akash.assignments@gmail.com',
            to: email,
            subject: 'Welcome to Dhanam',
            text: 'You have successfully created account with Dhanam'
        }
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err)
            } else {
                console.log('Email sent: ' + info.response)
            }
        });
        res.send("Added successfully")
    }catch(err){
        if(err.code === 11000){
            // duplicate key error for email
            return res.json({status: 'error', error: 'Email already exists!!'})
        }
        throw err;
    }
})

router.post('/sign-in', async (req, res) => {
    const {email, password} = req.body;
    const getuser = await user.findOne({email}).lean();

    if(!getuser){
        return res.json({status: 'error', error: "user not found!!"});
    }
    if(await bcrypt.compare(password, getuser.password)){
        // successfull combination of email and password
        return res.json({status: 'ok', msg: 'signed in'})
    }
    res.json({status: 'error', error: 'Invalid email/password!!'})
})

module.exports = router;