import Post from "../models/postModel.js";


// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req,res)=>{
    try{

        const posts = await Post.find().sort({ date: -1 })
        res.status(200).json(posts)

    }catch(e){
        res.status(501).json({"message":e.message});

    }
}

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log(req.user);

        // Get userId from isAuthenticated middleware
        const author = req.user._id; 
        // console.log(author);
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }
        if (!author) {
            return res.status(400).json({ error: 'Author information is missing' });
        }

        const newPost = new Post({
            title,
            content,
            author,
        });
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create post.", error: error.message });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this post." });
        }

        // Update the post
        post.title = title || post.title;
        post.content = content || post.content;

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update post.", error: error.message });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;

        const post = await Post.findById(postId);
        console.log('hey this is post = ' + post);
        

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post." });
        }

        await post.deleteOne({ _id: postId });
        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete post.", error: error.message });
    }
};






// @desc    Add a comment
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
    const { text } = req.body;
  
    const post = await Post.findById(req.params.id);
  
    if (post) {
      const comment = {
        text,
        user: req.user._id,
      };
  
      post.comments.push(comment);
      await post.save();
  
      res.status(201).json(post);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  };