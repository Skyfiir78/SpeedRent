const auth = require('../Middleware/auth')
const { User, validate } = require('../Model/userModel')
const bcrypt = require("bcrypt")

// Handle index actions
exports.new = async function (req, res) {
    const { error } = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json("User already registered.");

    user = new User({
        password: req.body.password,
        email: req.body.email
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).json({
        _id: user._id,
        name: user.name,
        email: user.email
    });
};
