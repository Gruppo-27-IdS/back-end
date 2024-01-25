const express = require("express");
const Project = require("../../models/projects");
const Manager = require("../../models/managers");
const fs = require('fs');
const path = require('path');
const validateToken = require("../validate_token");
const router = express.Router();
// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());

// delete user by id
// POST /remove_project/
// Params: id
router.post("/delete_project/",validateToken, async (req, res) => {
    const project = await Project.findById(req.body.project_id);
    //eliminare le foto
    for (let i = 0; i < project.images.length; i++) {
        const directory = path.join(__dirname, '../../projects_images/');
        const filePath = directory + project.images[i];
        try {
            fs.unlinkSync(filePath)
            //file removed
        } catch (err) {
            console.error(err)
        }
    }
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
                else{
                  res.status(201).json({ message: "Project Removed Successfully" });
                }
                  
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
