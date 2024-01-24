const express = require("express");
const router = express.Router();
const User = require("../models/users");
const cors = require('cors');

//API
const apiRoutes = require("../API/index");
router.use(cors());
router.use("/api", apiRoutes);

// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());
  
//Get all users visual
router.get("/", (req, res) => {
  User.find()
    .then((data) => {
      res.render("index", { title: "User List", users: data });
    })
    .catch((error) => {
        res.json({ message: error, type: "danger" });
    });
});

router.get("/add", (req, res) => {
  res.render("add_user", { title: "Add User" });
});

//edit an user visual
router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id)
    .then((data) => {
      res.render("edit_users", { title: "Edit User", user: data });
    })
    .catch((error) => {
      res.redirect("/");
    });
});


module.exports = router;
