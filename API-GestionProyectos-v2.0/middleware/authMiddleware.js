import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserById } from '../models/userModel.js';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = await getUserById(user.id);
    next();
  });
};

export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol_id)) {
      return res.sendStatus(403); // Forbidden
    }

    next();
  };
};
