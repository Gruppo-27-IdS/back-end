const express = require("express");
const Project = require("../../models/projects");
const Manager = require("../../models/managers");
const User = require("../../models/users");
const router = express.Router();

// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());
/**
 * TODO: da documentare 
 * comunque dato nome utente o nome progetto restituisce i progetti
 * JSON
 * @returns {string} message - The result message.
 * 201 - User Added Successfully
 * 500 - Error while adding user to database
 */
router.post("/get_proj_by_id", async (req, res) => {
    try {
        const { project_id} = req.body;
        const project = await Project.findById(project_id);
        if(!!project){
            res.status(200).json({message: "Project found!",project});
        }else{
            res.status(500).json({ message: "Project does not exists", type: "danger" });
        }    
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
