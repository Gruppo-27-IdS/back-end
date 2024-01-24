/**
 * @fileoverview This file contains the API endpoint for adding an user.
 * @module API/upload_images
 */
const express = require("express");
const multer = require("multer");
const validateToken = require("../validate_token");
const path = require("path");
const Project = require("../../models/projects");
const router = express.Router();

// Middleware to handle JSON data in requests
router.use(express.json());

/**
 * Middleware for handling image upload.
 * The uploaded image will be stored in the "./uploads" directory.
 * The filename will be generated using the fieldname, current timestamp, and original filename.
 */
var project;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./projects_images/");
  },
  filename: async function (req, file, cb) {
    project=await Project.findById(req.body.project_id);
    cb(null, project.name+"#"+Date.now() + "_" + path.extname(file.originalname) );
  },
});

var upload = multer({ storage: storage }).single("image");

/**
 * POST /upload_proje_images
 */
router.post("/upload_proj_images", upload, validateToken, async (req, res) => {
  try {
    // Extract data from the POST input
    var { project_id } = req.body;

    if (!project) {
      res.status(500).json({ message: "Project not found", type: "danger" });
    } else {
      nomeCartella = project._id + "_" + project.name;
      // Salva i nomi dei file in un array
      const nomeFile = req.file.filename;
      project.images.push(nomeFile);
      // Save the user to the database
      await project.save();
      // Respond with a success message
      res
        .status(201)
        .json({ message: "Image Added Successfully to " + project.name });
    }
  } catch (error) {
    // Respond with an error message
    res.status(500).json({ message: error.message, type: "danger" });
  }
});

module.exports = router;
