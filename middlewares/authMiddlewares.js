
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const authToken = async (req, res, next) => {
  try {
    const token = req.header("auth");

    if (!token) {
      return res.status(401).json({ msg: "Please login first." });
    }

    const decoded = jwt.verify(token, process.env.TOKEN);
    const user = await User.findById(decoded._id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};

module.exports = authToken;
