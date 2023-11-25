const User = require("../models/user");
const bcrypt = require("bcryptjs");

// register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if required fields are missing
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide username, email, and password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User({
      username,
      email,
      password: hashedPass,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// login user
const loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).json("Wrong credentials!");
      }
  
      const validatePass = await bcrypt.compare(req.body.password, user.password);
  
      if (!validatePass) {
        return res.status(400).json("Wrong credentials!");
      }
  
      const { password, ...others } = user._doc;
      return res.status(200).json(others);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

module.exports = {
  registerUser,
  loginUser,
};
