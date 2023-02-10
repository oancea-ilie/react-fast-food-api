import expressAsyncHandler from 'express-async-handler';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      console.log('AICI->', process.env.JWT_TOKEN);

      req.user = await db.models.Customer.findByPk(decoded.id);

      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      throw new Error('Not authorized, token failed!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token!');
  }
});

export default protect;
