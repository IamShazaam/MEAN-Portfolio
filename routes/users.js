const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/logged-in', async (req, res) => {
  try {
    const users = await User.find({ loggedIn: true });
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving logged-in users.' });
  }
});

module.exports = router;
