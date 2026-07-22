const express = require("express");
const router = express.Router();
const SignUp = require("../models/signup");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "LearnMernStack";

// Login User
router.post("/", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Check if user exists
    const user = await SignUp.findOne({ Email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }

    // Create JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.Email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        id: user._id,
        Username: user.Username,
        Email: user.Email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;