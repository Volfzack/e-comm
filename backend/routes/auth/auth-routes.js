import express from 'express';
import { login, logout, register, authMiddleware } from '../../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  });

export default authRouter;