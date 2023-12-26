const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route POST api/users
// @access public
// @desc Register user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be more than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // To validate the request body contents before sending to db.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting data from request body
    const { name, email, password } = req.body;

    try {
      // See if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists." }] });
      }

      // Fetching avatar of user's email.
      const avatar = gravatar.url(email, {
        size: "200",
        rating: "pg",
        default: "mm",
      });

      // Creating new user instance with User model
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
