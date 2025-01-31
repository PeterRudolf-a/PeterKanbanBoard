import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secret = process.env.ACCESS_TOKEN_SECRET;
if (!secret) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined');
}

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = jwt.sign(
    { username },
    secret
  );
  res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
