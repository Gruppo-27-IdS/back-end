/**
 * @fileoverview This file contains the API endpoint for adding an user.
 * @module API/upload_images
 */
const express = require("express");
const multer = require("multer");
const validateToken = require("../validate_token");
const router = express.Router();

// Middleware to handle JSON data in requests
router.use(express.json());

/**
 * Middleware for handling image upload.
 * The uploaded image will be stored in the "./uploads" directory.
 * The filename will be generated using the fieldname, current timestamp, and original filename.
 */
var nomeCartella="";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./projects_images/nomeCartella");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

/**
 * POST /upload_proje_images
 */
router.post("/upload_proj_images", validateToken, async (req, res) => {
  try {
    if (!req.body.files) {
        return res.status(400).json({ error: 'Il campo "files" è richiesto' });
    }
    // Extract data from the POST input
    const { project } = req.body;

    nomeCartella = project._id+"_"+project.name;

    
    //salvo le immagini
    await upload.array("files");
    // Salva i nomi dei file in un array
    const nomiFile = req.body.files;

    //aggiungo i nomi dei file al progetto
    project.images.push(nomiFile);
    // Save the user to the database


    await project.save();

    // Respond with a success message
    res.status(201).json({ message: "User Added Successfully" });
  } catch (error) {
    // Respond with an error message
    res.status(500).json({ message: error.message, type: "danger" });
  }
});

module.exports = router;
