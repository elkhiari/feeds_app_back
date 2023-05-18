const postsModel = require("../../models/posts.model");
const usersModel = require("../../models/users.model");


const get_me = async(req,res) => {
    try {
        const posts = await postsModel.find({ user: req.user._id }).populate('user',{password:0}).sort({ dateCreated: -1 });
        const data = {...req.user._doc,posts};
        return res.status(200).json({user: data });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const get_user_and_post = async(req,res) => {
    try {
        const user = await usersModel.findOne({username:req.params.username},{password:0});
        if (!user) return res.status(404).json({ message: 'User not found' });
        const posts = await postsModel.find({ user:user._id }).populate('user',{password:0}).sort({ dateCreated: -1 });
        res.status(200).json({user:{user,posts}});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const get_All_user = async(req,res) => {
    try {
        const users = await usersModel.find({},{password:0});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {get_me,get_user_and_post,get_All_user};