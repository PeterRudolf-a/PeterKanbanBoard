import { Router, Request, Response } from 'express'; // Import the necessary types from express
import { User } from '../models/user.js'; // Import the User model
import jwt from 'jsonwebtoken'; // Import jwt from jsonwebtoken
import bcrypt from 'bcrypt'; // Import bcrypt

// Get the secret from the environment
const secret = process.env.ACCESS_TOKEN_SECRET;
if (!secret) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined'); // Throw an error if the secret is not defined
}

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body; // Get the username and password from the request body
  const user = await User.findOne({ 
    where: { username: username } // Find the user by username
  });

  if (!user) {
    return res.status(404).send('User not found'); // Return a 404 Not Found status if the user is not found
  }

  // Check if the password is valid
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send('Invalid password'); // Return a 401 Unauthorized status if the password is invalid
  }
  // Create a JWT token
  const secretKey = process.env.ACCESS_TOKEN_SECRET || '';

  // Sign the token with the user's username
  const token = jwt.sign({ username: user.username }, secretKey);
  return res.json({ token }); // Return the token
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
