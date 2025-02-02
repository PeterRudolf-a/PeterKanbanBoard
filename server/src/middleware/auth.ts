import { Request, Response, NextFunction } from 'express'; // import the necessary types from express
import jwt from 'jsonwebtoken'; // import jwt from 'jsonwebtoken'

// Extend the Request interface to include a user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

// Define the JwtPayload interface
interface JwtPayload {
  username: string;
}

// Define a type guard for the JwtPayload interface
const isJwtPayload = (decoded: any): decoded is JwtPayload => {
  return decoded && typeof decoded.username === 'string';
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization; // Get the authorization header from the request
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Get the token from the authorization header

    const secret = process.env.ACCESS_TOKEN_SECRET || ''; // Get the secret key from the environment
    
    jwt.verify(token, secret, (err, user: any) => {
      if (err) {
        return res.sendStatus(403); // Return a 403 Forbidden status if there is an error
      }
      if (isJwtPayload(user)) {
        req.user = user; // Add the user data to the request object if it is valid
        return next(); // Call the next middleware function
      } else {
        return res.sendStatus(403); // Return a 403 Forbidden status if the user data is invalid
      }
    });
  } else {
    return res.sendStatus(401); // Return a 401 Unauthorized status if there is no authorization header
  }
  return; // Ensure all code paths return a value
};
