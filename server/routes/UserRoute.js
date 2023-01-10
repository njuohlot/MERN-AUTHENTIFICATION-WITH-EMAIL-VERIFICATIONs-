const { User, validateRegister } = require("../models/UserModel.js");
const Token = require("../models/token.js");
const sendMail = require("../sendEmail.js");
const { isAdmin, isAuth, generateToken } = require("../utils.js");
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const expressAsyncHandler = require("express-async-handler");
const userRouter = express.Router();

//create-user

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(401)
          .send({ message: "User with given Email Already Exist! " });
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const harshPassword = await bcrypt.hash(req.body.password, salt);
      user = await new User({ ...req.body, password: harshPassword }).save();
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
      sendMail(user.email, 'Verify Shoppee Account', url);
      res.status(201).send({
        message: 'An Email has been sent to your Account Please verify'
      })
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        message: 'Internal server Error'
      });

    }
  })
 
);

//verify user email
       userRouter.get(
         "/:id/verify/:token",
         expressAsyncHandler(async (req, res) => {
           try {
             const user = await User.findOne({_id: req.params.id });
             if (!user)
               res.status(400).send({
                 message: "Invalid Link",
               });
             const token = await User.findOne({
               userId: user._id,
               token: req.params.token,
             });
             if (!user)
               res.status(400).send({
                 message: "Invalid Link",
               });
             await User.updateOne({ _id: user._id, verified: true });
             res.status(200).send({
               message: "Email Verified Successfully",
             });
           } catch (error) {
             console.log(error.message);
             res.status(500).send({
               message: "Internal server Error",
             });
           }
         })
       );
//login-user

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
     
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res
          .status(401)
          .send({ message: "Invalid Email or Password" });
      const validPassword = bcrypt.compare(req.body.password, user.password)
      if(!validPassword)
       return res.status(401).send({ message: "Invalid Email or Password" });
       if(!user.verified){
        let token = await Token.findOne({userId: user._id})
        if(!token){
          token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),

          }).save();
           const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
          sendMail(user.email, "Verify Shoppee Account", url);
        }
        return res.status(400).send({
          message: "An Email has been sent to your Account Please verify",
        });

       }
        let token = await Token.findOne({ userId: user._id });
       res.status(200).send({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         verified: user.verified,
         token: token,
       });
      
      
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        message: "Internal server Error",
      });
      
    }
  })
);



module.exports = userRouter;
