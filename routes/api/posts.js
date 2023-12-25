const express = require("express");
const router = express.Router();

// @route GET api/posts
// @access public
// @desc Test route
router.get("/", (req, res) => res.send("Post route"));

module.exports = router;
