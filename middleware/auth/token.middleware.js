const jwt = require('jsonwebtoken');
const usersModel = require('../../models/users.model');

const check_token = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Missing JWT token.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired!' });
        } else {
          return res.status(401).json({ message: 'Invalid token!' });
        }
      } else {
        const user = await usersModel.findById(decoded.id,{password:0});
        req.user = user;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authorization Failed!' });
  }
};

module.exports = check_token;