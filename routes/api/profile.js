const express = require("express");
const config = require("config");
const request = require("request");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult, body } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/me
// @access private
// @desc Get profile of current user.
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/profile
// @access private
// @desc Create or update a user profile.
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // To validate the request body contents before sending to db.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      status,
      skills,
      company,
      website,
      location,
      bio,
      githubusername,
      youtube,
      facebook,
      x, // twitter
      instagram,
      linkedin,
    } = req.body;

    // Build user profile
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (status) profileFields.status = status;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (x) profileFields.social.x = x;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create profile
      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/profile
// @access public
// @desc Get all profiles.
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/profile/user/:user_id
// @access public
// @desc Get profile by user ID.
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId")
      return res.status(400).json({ msg: "Profile not found" });
    res.status(500).send("Server error");
  }
});

// @route DELETE api/profile
// @access private
// @desc Delete user profile, user & post.
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    // @todo Remove posts
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/profile/experience
// @access private
// @desc Add profile experience
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // To validate the request body contents before sending to db.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, from, location, to, current, description } =
      req.body;

    // Build user experience object
    const newExp = { title, company, from, location, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route DELETE api/profile/experience/:exp_id
// @access private
// @desc Delete a experience from profile
router.delete(
  "/experience/:exp_id",

  auth,

  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get index to remove
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      // Remove experience at found index
      profile.experience.splice(removeIndex, 1);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT api/profile/experience/:exp_id
// @access private
// @desc Update profile experience
router.put(
  "/experience/:exp_id",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // To validate the request body contents before sending to db.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, from, location, to, current, description } =
      req.body;

    // Build user experience object
    const updatedExp = {
      title,
      company,
      from,
      location,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get index to update
      const updateIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      profile.experience = profile.experience.with(updateIndex, updatedExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT api/profile/education
// @access private
// @desc Add profile education
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // To validate the request body contents before sending to db.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    // Build user education object
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route DELETE api/profile/education/:edu_id
// @access private
// @desc Delete a education from profile
router.delete(
  "/education/:edu_id",

  auth,

  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get index to remove
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      // Remove education at found index
      profile.education.splice(removeIndex, 1);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT api/profile/education/:edu_id
// @access private
// @desc Update profile education
router.put(
  "/education/:edu_id",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // To validate the request body contents before sending to db.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    // Build user education object
    const updatedEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get index to update
      const updateIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      profile.education = profile.education.with(updateIndex, updatedEdu);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/profile/github/:username
// @access public
// @desc Get user repos from Github
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
