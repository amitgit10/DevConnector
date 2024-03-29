const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult, body } = require("express-validator");

const User = require("../../models/User");
const Post = require("../../models/Post");

// @route POST api/posts
// @access private
// @desc Create a post
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      // Build post object
      const newPostFields = {
        name: user.name,
        user: user.id,
        avatar: user.avatar,
        text: req.body.text,
      };

      const newPost = new Post(newPostFields);
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/posts
// @access private
// @desc Get all post
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/posts/:id
// @access private
// @desc Get post by id
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route DELETE api/posts/:id
// @access private
// @desc Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user is valid
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorized." });
    }

    await post.deleteOne();
    res.json({ msg: "Post deleted." });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route PUT api/posts/like/:id
// @access private
// @desc Like a post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check whether the post is already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length
    ) {
      //return res.status(400).json({ msg: "Post already liked" });

      // Remove like if already like by same user
      const likeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.unshift({ user: req.user.id });
    }

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/posts/unlike/:id
// @access private
// @desc Unlike a post (This endpoint is Not in use)
/* router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check whether the post is already been liked
    if (
      !post.likes.filter((like) => like.user.toString() === req.user.id).length
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    const likeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(likeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
}); */

// @route POST api/posts/comment/:id
// @access private
// @desc Comment on a post
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      // Build comment object
      const newComment = {
        name: user.name,
        user: user.id,
        avatar: user.avatar,
        text: req.body.text,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @access private
// @desc Delete a comment
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Get comment to delete
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Send error msg if comment not found
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not unauthorized" });
    }

    // Find comment index
    const commentIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(commentIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/posts/comment/:id/:comment_id
// @access private
// @desc Update a comment
router.put("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Get comment to update
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Send error msg if comment not found
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not unauthorized" });
    }

    // Update comment

    comment.text = req.body.text;

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
