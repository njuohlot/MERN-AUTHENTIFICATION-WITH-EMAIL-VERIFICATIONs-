const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const UserShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserShema.method.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET, 
    {
      expiresIn: '7d'
    }
  );
  return token;

}

const User = mongoose.model("user", UserShema)

const validateRegister = () =>{
  const schema = joi.object({
    name:
    joi.string().required().label('name'),
    email:
    joi.string().email().required().label('email'),
    password:
    passwordComplexity().required().label('password')
  })
  return schema.validate(data);
}


module.exports = {User, validateRegister}