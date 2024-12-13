import express from 'express';
import { createPost, updatePost, deletePost, getPosts } from '../controllers/postController.js'

const blogRouter = express.Router();


// Protected route for testing
// blogRouter.get('/protected', (req, res) => {
//     res.json({ message: 'Accès autorisé' });
//     console.log(req.user);

// });

//route postBlog
blogRouter.get('/' , getPosts );
blogRouter.post('/createPost' , createPost );
blogRouter.put("/:postId", updatePost);
blogRouter.delete("/:postId", deletePost);
// blogRouter.post('/createPost',isAuthenticated , createPost );
// blogRouter.put("/:postId", isAuthenticated, updatePost);
// routblogRouterer.delete("/:postId", isAuthenticated, deletePost);





export default blogRouter;