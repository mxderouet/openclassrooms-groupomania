const jwt = require('jsonwebtoken');
const { user } = require('../controllers');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // we check that the Token is the same with the secret key
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      req.userId = userId;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};