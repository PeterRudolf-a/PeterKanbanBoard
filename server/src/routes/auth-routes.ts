import { Router, Request, Response } from "express"; // Import the necessary types from express
import { User } from "../models/user.js"; // Import the User model
import jwt from "jsonwebtoken"; // Import jwt from jsonwebtoken
import bcrypt from "bcrypt"; // Import bcrypt
import path from "path"; // Import path

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username }, secretKey, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

// Serve the login page
router.get("/login", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

export default router;
