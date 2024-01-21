// Import required modules
const express = require("express");
const router = express.Router();
const Project = require("../../models/projects");
const validate_token = require("../validate_token");

// Define the route for adding a new project
router.post("/add_project", validate_token, async (req, res) => {
  // Get the project data from the request body
  try {
    const {
      name,
      description,
      category,
      start_date,
      end_date,
      opensource,
      likes
    } = req.body;
    const project = new Project({
      name,
      description,
      category,
      start_date,
      end_date,
      opensource,
        likes
    });
    // Save the project to the database
    await project.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, type: "danger" });
  }

});

module.exports = router;
