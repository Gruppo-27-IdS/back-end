/**
 * @fileoverview This file contains the API endpoint for adding an user.
 * @module API/follow_project
 */
const express = require("express");
const User = require("../../models/users");
const Follower = require("../../models/follower");
const Project = require("../../models/projects");
const Manager = require("../../models/managers");
const validateToken = require("../validate_token");
const router = express.Router();

// Middleware to handle JSON data in requests
router.use(express.json());

router.post("/follow_project",validateToken, async (req, res) => {
  try {
    // Extract data from the POST input
    const { user_id, project_id } = req.body;
    const u = await User.findById(user_id);
    const p = await Project.findById(project_id);
    const m = await Manager.findOne({ project_id, user_id });
    const f = await Follower.findOne({ user_id, project_id });
    if (!f && !!u && !!p && !m) {
      const follower = new Follower({
        user_id,
        project_id,
      });
      await follower.save();
      res
        .status(201)
        .json({ message: "The user follow a new project Successfully" });
    } else {
        if(!!f)
            res.status(500).json({ message: "Already following", type: "danger" });
        else if(!u)
            res.status(500).json({ message: "User does not exists", type: "danger" });
        else if(!p)
            res.status(500).json({ message: "Project does not exists", type: "danger" });
        else if(!!m)
            res.status(500).json({ message: "User is a manager of this project", type: "danger" });
    }
  } catch (error) {
    // Respond with an error message
    res.status(500).json({ message: error.message, type: "danger" });
  }
});

module.exports = router;
