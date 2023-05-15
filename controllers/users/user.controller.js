const get_me = (req,res) => {
    try {
        return res.status(200).json({user: req.user})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {get_me};