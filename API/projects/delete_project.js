const express = require("express");
const Project = require("../../models/projects");
const Manager = require("../../models/managers");
const validateToken = require("../validate_token");
const router = express.Router();
// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());

// delete user by id
// POST /remove_project/
// Params: id
router.post("/delete_project/",validateToken, async (req, res) => {
    const {project_name} = req.body;
    const project = await Project.findOne({name: project_name});
    if(!!project){
      Project.findByIdAndDelete(project._id)
      .then((data) => {
        if(data == null) 
            res.status(404).json({ message: "Project Not Found" });
        else{
            Manager.findOneAndDelete({project_id: project._id})
            .then((data) => {
                if(data == null) 
                    res.status(404).json({ message: "Manager Not Found" });
                else
                  res.status(201).json({ message: "Project Removed Successfully" });
            })
            .catch((error) => {
                res.status(500).json({ message: error.message, type: "danger" });
            });
            
        }
            
      })
      .catch((error) => {
        res.status(500).json({ message: error.message, type: "danger" });
      });
    }else{
        res.status(404).json({ message: "Project Not Found" });
    }
    
  });

module.exports = router;
