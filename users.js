const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/logged-in', async (req, res) => {
  try {
    const users = await User.find({ loggedIn: true }).exec();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving logged-in users.' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, carrier } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      carrier,
      loggedIn: false,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the user.' });
  }
});

module.exports = router;
