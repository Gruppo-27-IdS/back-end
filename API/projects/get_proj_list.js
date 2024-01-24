const express = require("express");
const Project = require("../../models/projects");
const Manager = require("../../models/managers");
const User = require("../../models/users");
const router = express.Router();

// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());

router.get("/get_all_projects", async (req, res) => {
    try {
        // Retrieve all projects from the database
        const projects = await Project.find();
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const manager = await Manager.findOne({ project_id: project._id });
            const user = await User.findById( manager.user_id );
            console.log(user);
            projects[i] = {
                _id: project._id,
                name: project.name, 
                description: project.description,
                category: project.category,
                start_date: project.start_date,
                end_date: project.end_date,
                opensource: project.opensource,
                manager: {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    surname: user.surname,
                    age: user.age,
                    phone: user.phone,
                    email: user.email,
                },
            };
        }
        // Respond with the users in JSON format
        res.status(200).json(projects);
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
