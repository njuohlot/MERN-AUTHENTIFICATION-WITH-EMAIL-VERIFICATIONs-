const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");
module.exports  = asyncHandler(async(email,subject,text) =>{
    try {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.USER, //generated ethereal user
            pass: process.env.PASS, //generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        transporter.sendMail({
          from: process.env.MAIL_FROM,
          to: email,
          subject: subject,
          text: text,
        });
        console.log('Email sent successfully')
    } catch (error) {
        console.log('Email not Sent')
        console.log(error.message)
    }

})



