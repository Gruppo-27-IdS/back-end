// Import necessary modules and dependencies
const express = require("express");
const router = express.Router();
const News = require("../../models/news");
const User = require("../../models/users");
const validateToken = require("../validate_token");
router.use(express.json());

// Define the route for adding a news
router.post("/add_comment_news", validateToken, async (req, res) => {
  try {
    const { news_id, username } = req.body;
    const news = await News.findById(news_id);
    const user = await User.findOne({username: username});

    if (!!news && !!user) {
      news.comments.push({
        username: username,
        comment: req.body.comment
      });
      await news.save();
        res.status(201).json({ message: "Comment added successfully" });
    }else{
        res.status(404).json({ message: "News or user Not Found" });
    }
  } catch (error) {
    // Return an error response
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
