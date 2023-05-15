const postsModel = require("../../models/posts.model");

const add_post = async (req, res) => {
  try {
    const { content, picture } = req.body;

    if (!content ||!picture) {
      return res.status(400).json({ message: "Content and picture are required" });
    }
    const post = new postsModel({
        user: req.user._id,
        content,
        picture,
    });

    await post.save();
    res.status(200).json({ message: "Success: Post created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const get_post = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await postsModel.findById(postId).populate('user',{password:0});
      res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const get_all_posts_by_user = async (req,res) => {
    try {
      const posts = await postsModel.find({ user:req.params.user }).populate('user',{password:0});
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const delete_post = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await postsModel.findById(postId);
  
      if (!post)return res.status(404).json({ message: 'Post not found' });
  
      if (post.user !== req.user._id) return res.status(403).json({ message: 'Unauthorized: User cannot delete this post' });
  
      await postsModel.findByIdAndDelete(postId);
      res.status(200).json({ message: 'Success: Post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
  add_post, get_all_posts_by_user, delete_post, get_post
};
