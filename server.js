  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');
  const bcrypt = require('bcryptjs');
  const { connectToDatabase } = require('./db');
  const app = express();
  require("dotenv").config();
  const session = require('express-session');

  app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  }));


  app.use(bodyParser.json());

  // Add CORS headers middleware function
  app.use(cors());
  app.use(cookieParser());

  const port = process.env.PORT || 3000;


  app.post('/api/register', async (req, res) => {
    try {
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // Hash the password before storing it in the database
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        carrier: req.body.carrier,
      };

      console.log(data);

      const db = await connectToDatabase();
      const result = await db.collection('users').insertOne(data);

      console.log(result);

      if (result.acknowledged === true) {
        res.status(200).json({ message: 'User registered successfully' });
      } else {
        res.status(500).send('Failed to register user');
      }
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Failed to register user');
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      const db = await connectToDatabase();
      const query = req.query;

      // Construct the filter object based on the query parameters
      const filter = {};
      if (query.firstName) {
        filter.firstName = { $regex: query.firstName, $options: 'i' };
      }
      if (query.lastName) {
        filter.lastName = { $regex: query.lastName, $options: 'i' };
      }
      if (query.email) {
        filter.email = { $regex: query.email, $options: 'i' };
      }
      if (query.gender) {
        filter.gender = { $regex: query.gender, $options: 'i' };
      }
      if (query.carrier) {
        filter.carrier = { $regex: query.carrier, $options: 'i' };
      }
      if (query.loggedIn) {
        filter.loggedIn = (query.loggedIn === 'true');
      }

      const users = await db.collection('users').find(filter).toArray();
      console.table(users);
      res.json(users);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ email, password, loggedIn: false });

    if (!user) {
      return res.json({ success: false, message: 'Invalid login credentials' });
    }

    // Update the loggedIn field to true for the logged in user
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { loggedIn: true } }
    );

    // Store the user ID in the session
    req.session.userId = user._id;

    res.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
