const usersModel = require("../../models/users.model");

const userAlreadyExists = async (req, res, next) => {
    try {
        const { username, email, password, profile, phoneNumber, fullName } = req.body;
        if(!password || !email || !username || !fullName) return res.status(401).json({ message:'messing cardenality' });
        const userU = await usersModel.findOne({ email });
        if (userU) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const userE = await usersModel.findOne({ username });
        if (userE) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {userAlreadyExists}