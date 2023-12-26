// Middleware to verify the token on every request.
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if token exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Token is not valid." });
  }
};
