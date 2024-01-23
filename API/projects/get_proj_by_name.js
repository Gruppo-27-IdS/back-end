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
router.post("/get_proj_by_name", async (req, res) => {
    try {
    
        const { manager, project_name } = req.body;
        if(!!project_name){
            const projects = await Project.find({name: project_name});
            const return_projects = [];
            for(let i=0; i<projects.length; i++){
                const proj_manager = await Manager.findOne({project_id: projects[i]._id});
                const m =await User.findOne({_id: proj_manager.user_id});
                const specialManager = {
                    _id: m._id,
                    username: m.username,
                    name: m.name,
                    surname: m.surname,
                    age: m.age,
                    phone: m.phone,
                    email: m.email
                }
                return_projects[i] = {
                    _id: projects[i]._id,
                    name: projects[i].name,
                    description: projects[i].description,
                    category: projects[i].category,
                    start_date: projects[i].start_date,
                    end_date: projects[i].end_date,
                    opensource: projects[i].opensource,
                    manager: specialManager
                }
            }
            
            res.status(200).json(return_projects);
        }else if(!!manager){
            const user = await User.findOne({username: manager});
            if(!user){
                res.status(500).json({ message: "User does not exists", type: "danger" });
                
            }else{
                const managers = await Manager.find({user_id: user._id}); //mi serve la lista
            
                const projects = [];
                for(let i=0; i<managers.length; i++){
                    const project = await Project.find({_id: managers[i].project_id});
                    projects.push(project);
                }
                res.status(200).json(projects);
            }
            
        }else
            res.status(500).json({ message: "Project does not exists", type: "danger" });
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
