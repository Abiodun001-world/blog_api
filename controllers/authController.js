const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } 
  );
};

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user._id);  
    res.status(201).json({ user, token });  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {  
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);  
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error during signin", error: error.message });
  }
};