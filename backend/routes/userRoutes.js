import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser); // public
userRoutes.post('/login', loginUser);// public
userRoutes.post('/logout',protect, logoutUser);// private
userRoutes.get('/profile', protect , getUserProfile);// private


export default userRoutes;