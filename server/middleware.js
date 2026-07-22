const jwt = require("jsonwebtoken");
const JWT_SECRET = "LearnMernStack";

const authmiddleware = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);

    console.log("data",data)
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authmiddleware;