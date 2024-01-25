// Import necessary modules and dependencies
const express = require("express");
const router = express.Router();
const News = require("../../models/news");
const User = require("../../models/users");
const validateToken = require("../validate_token");
router.use(express.json());

// Define the route for adding a news
router.post("/add_or_remove_like", validateToken, async (req, res) => {
  try {
    const { news_id, username } = req.body;
    const news = await News.findById(news_id);
    const user = await User.findOne({username: username});

    if (!!news && !!user) {
      
      if (!news.likes.includes(username)) {
        news.likes.push(username);
        await news.save();
        res.status(201).json({ message: "Like added successfully" });
      } else {
        news.likes.pull(username);
        await news.save();
        res.status(201).json({ message: "Like removed successfully" });
      }
    }else{
        res.status(404).json({ message: "News or user Not Found" });
    }
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
