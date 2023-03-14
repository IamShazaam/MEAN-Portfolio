const express = require('express');
const router = express.Router();
const client = require('./db');

router.post('/register', (req, res) => {
  const data = req.body;

  client.connect(err => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to connect to database');
      return;
    }

    const db = client.db('user-registration');
    const collection = db.collection('user');

    collection.insertOne(data, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to register user');
        return;
      }

      res.status(200).send('User registered successfully');
    });
  });
});

module.exports = router;
