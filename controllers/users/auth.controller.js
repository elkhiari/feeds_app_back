const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../../models/users.model');

const register = async (req, res) => {
    try {
        const { username, email, password, profile, phoneNumber, fullName } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        if (!passwordHash) return res.status(500).json({ message: 'Internal Server Error' });
        const user = new usersModel({ username, email, password: passwordHash, profile, phoneNumber, fullName });
        await user.save();
        return res.status(201).json({ message: 'registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'password incorrect' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });
        return res.status(200).json({ message: 'logged is successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { register, login };