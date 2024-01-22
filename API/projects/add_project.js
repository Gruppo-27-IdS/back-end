// Import required modules
const express = require("express");
const router = express.Router();
const Project = require("../../models/projects");
const validate_token = require("../validate_token");

// Define the route for adding a new project
/**
 * POST /add_project
 * Add a new project to the database.
 * HEADER
 * @var {string} authorization - Bearer JWT token (presente nei cookie).
 * JSON
 * @var {string} name - The name of the project.
 * @var {string} description - The description of the project.
 * @var {string} category - The category of the project.
 * @var {Date} start_date - The start date of the project.
 * @var {Date} end_date - The end date of the project.
 * @var {boolean} opensource - The opensource status of the project.
 * RETURNS
 * @returns {string} message - The result message.
 * 201 - User Added Successfully
 * 500 - Error while adding user to database
 */
router.post("/add_project", validate_token, async (req, res) => {
  // Get the project data from the request body
  try {
    const {
      name,
      description,
      category,
      start_date,
      end_date,
      opensource
    } = req.body;
    const project = new Project({
      name,
      description,
      category,
      start_date,
      end_date,
      opensource
    });
    // Save the project to the database
    await project.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, type: "danger" });
  }

});

module.exports = router;
