const postsModel = require("../../models/posts.model");

const add_post = async (req, res) => {
  try {
    const { content, picture } = req.body;
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

module.exports = {
  add_post,
};
