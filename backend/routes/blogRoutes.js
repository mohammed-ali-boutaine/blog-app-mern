import express from 'express';
import { registerUser, loginUser, isAuthenticated, logoutUser } from '../controllers/userController.js';
import { createPost, updatePost, deletePost } from '../controllers/postController.js'

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route for testing
router.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'Accès autorisé' });
    console.log(req.user);

});

//route postBlog
router.post('/createPost',isAuthenticated , createPost );
router.put("/:postId", isAuthenticated, updatePost);
router.delete("/:postId", isAuthenticated, deletePost);




router.post('/logout', logoutUser);

export default router;