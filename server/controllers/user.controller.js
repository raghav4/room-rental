const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, validate, validateLogIn } = require('../models/user.model');

exports.userSignUp = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, phone, email, password } = req.body;
  let user = await User.findOne({ phone, email });
  if (user) return res.status(409).send('Email or Phone already in use');

  user = new User({
    name,
    phone,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(15);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  return res.status(200).send(_.pick(user, ['name', 'phone', 'email']));
};

exports.logInUser = async (req, res) => {
  const { error } = validateLogIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Invalid email or password');

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res.status(401).send('Invalid email or password');
  }

  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send('Login Successfull');
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('User not found');

  return res.status(200).send(_.pick(user, ['name', 'email', 'phone']));
};
