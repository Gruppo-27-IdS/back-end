// Import required modules
const express = require("express");
const router = express.Router();
const Manager = require("../../models/managers");
const validate_token = require("../validate_token");

router.post("/add_project_to_manager", validate_token, async (req, res) => {
  try {
    const { project_id, user_id } = req.body;
    const managerExists = await Manager.findOne({ user_id, project_id });
    if(!managerExists){
        const manager = new Manager({
            user_id,
            project_id
        });
        await manager.save();
        res.status(201).json({ message: "Project added successfully to a manager" });
    }else{
        res.status(500).json({ message: "Project already assigned to manager", type: "danger" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, type: "danger" });
  }
});

module.exports = router;
