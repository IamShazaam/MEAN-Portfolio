const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { connectToDatabase } = require('./db');
const { MongoClient } = require("mongodb");

const app = express();
// const port = 3000;
require("dotenv").config();

app.use(bodyParser.json());

// Add CORS headers middleware function
app.use(cors());
app.use(cookieParser());


// Connection URL
const url = process.env.DB_URL || "mongodb://localhost:27017";

// Database Name
const dbName = "portfolio";
// Secret key for JWT
const secretKey = process.env.SECRET_KEY || "199310183018";

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, secretKey);

    // Set loggedIn to true in the database
    await db.collection("users").updateOne({ _id: user._id }, { $set: { loggedIn: true } });

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid login credentials." });
  }
});

// Logout API
app.post("/logout", async (req, res) => {
  try {
    const { userId } = req.body;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Set loggedIn to false in the database
    await db.collection("users").updateOne({ _id: userId }, { $set: { loggedIn: false } });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging out." });
  }
});

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
