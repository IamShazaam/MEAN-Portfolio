const jwt = require('jsonwebtoken');
import { AuthService } from './auth';
const bcrypt = require('bcryptjs');

const secretKey = '199310183018'; // replace with your own secret key

// Middleware to verify JWT
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.redirect('/login');
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.redirect('/login');
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

// Login endpoint
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const db = getDb();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token and send it to the client
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '5m' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ success: true });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Failed to log in user');
  }
};

// Logout endpoint
const logout = async (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

module.exports = {
  requireAuth,
  login,
  logout,
  AuthService
};
