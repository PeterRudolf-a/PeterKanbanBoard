import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

const secret = process.env.ACCESS_TOKEN_SECRET as string;
if (!secret) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined');
}

const isJwtPayload = (decoded: any): decoded is JwtPayload => {
  return decoded && typeof decoded.username === 'string';
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded || typeof decoded !== 'object' || !('username' in decoded)) {
      return res.sendStatus(403);
    }
    if (isJwtPayload(decoded)) {
      req.user = decoded;
      next();
    } else {
      res.sendStatus(403);
    }
    next();
  });
};
