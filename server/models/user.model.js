require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 999,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
  return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().label('Name').min(5).required(),
    phone: Joi.string()
      .label('Phone')
      .regex(/^\d+$/)
      .length(10)
      .required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().label('Password').min(5).required(),
  });
  return schema.validate(user);
};

const validateLogIn = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().label('Password').required(),
  });
  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
exports.validateLogIn = validateLogIn;
