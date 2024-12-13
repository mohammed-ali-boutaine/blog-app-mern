import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js"



// @desc    Register a new user 
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    console.log(req.body);
    
    try {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            // Payload
            { userId: newUser._id, email: newUser.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
};





// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "user not found" });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "wrong password" });
        }

        // Create JWT token
        const token = jwt.sign(
            //payload 
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
};





// @desc    Get user profile (based on id from request)
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
    // Find user by ID and exclude password field
    const user = await User.findById(req.user._id).select('-password');
  
    // If user is found, respond with user details
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404); // Set status to Not Found
      return next(new Error('User not found')); // Pass error to error-handling middleware
    }
  };

// @desc    Update user profil 
// @route   PUT /api/users/profile
// @access  Public



// @desc    Logout (delete token)
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0), // Expire immediately
    });
    res.status(200).json({ message: "Logged out successfully" });
};
