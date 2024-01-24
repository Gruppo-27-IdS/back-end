const express = require("express");
const Project = require("../../models/projects");
const cors = require('cors');
const router = express.Router();

// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());
router.use(cors());
router.get("/get_all_projects", async (req, res) => {
    try {
        // Retrieve all users
        const projects = await Project.find();
        // Respond with the users in JSON format
        res.status(200).json(projects);
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
