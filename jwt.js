const jwt = require('jsonwebtoken');

const secret = 'my_secret_key';

function generateAccessToken(user) {
  const payload = { userId: user._id, name: user.name };
  const options = { expiresIn: '5m' };
  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    console.error('Error verifying access token:', err);
    return null;
  }
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
