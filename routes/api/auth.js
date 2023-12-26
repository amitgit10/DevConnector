const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// Using the auth middleware in this route to make the route protected.
const auth = require("../../middleware/auth");

// @route GET api/auth
// @access public
// @desc Auth protected route

router.get("/", auth, async (req, res) => {
  try {
    // '-password' will ask db to NOT send password in its response.
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error." });
  }
});

// @route POST api/auth
// @access public
// @desc Authenticate user
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Enter valid password.").exists(),
  ],
  async (req, res) => {
    // To validate the request body contents before sending to db.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting data from request body
    const { email, password } = req.body;

    try {
      // See if user exist
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credential" }] });
      }

      // Comapre user password with hashed password present in db.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credential" }] });
      }

      // Signing jsonwebtoken and returning token
      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
