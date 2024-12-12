import express from 'express';
import { registerUser, loginUser, isAuthenticated, logoutUser } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/logout', logoutUser);
userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);


export default userRoutes;