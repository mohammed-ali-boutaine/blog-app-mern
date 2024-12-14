import express from 'express';
import { check } from 'express-validator';

import { validate } from '../middlewares/validate.js';
import { protect } from '../middlewares/authMiddleware.js';

import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/userController.js';

const userRoutes = express.Router();


userRoutes.post('/register',
[
          check('email').isEmail().withMessage('Email Error'),
          check('password')
            .isLength({ min: 5 })
            .withMessage('Password must be at least 5 characters long'),
        ],
        validate
     , registerUser); // public
userRoutes.post('/login', loginUser);// public
userRoutes.post('/logout',protect, logoutUser);// private
userRoutes.get('/profile', protect , getUserProfile);// private


export default userRoutes;