// Import necessary modules and dependencies
const express = require("express");
const router = express.Router();
const News = require("../../models/news");
const Project = require("../../models/projects");
const User = require("../../models/users");
const validateToken = require("../validate_token");
router.use(express.json());

// Define the route for adding a news
router.post("/add_news",validateToken, async (req, res) => {
  try {
    const author = req.body.author;
    const project = await Project.findById(req.body.project_id);
    console.log(project);
    const user = await User.findOne({ username: author });
    if (!!project && !!user) {
      // Extract the news data from the request body
      //  senza allegati
      const news = new News({
        project_id: req.body.project_id,
        project_name: project.name,
        title: req.body.title,
        description: req.body.description,
        publish_date: req.body.publish_date,
        author: req.body.author,
      });

      // Save the news object to the database
      await news.save();

      // Return a success response
      res.status(201).json({ message: "News added successfully" });
    }else{
        res.status(404).json({ message: "Project/Author Not Found" });
    }
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
