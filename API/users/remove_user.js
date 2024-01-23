const express = require("express");
const validateToken = require("../validate_token");
const User = require("../../models/users");
const router = express.Router();
// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());

// delete user by id
// POST /remove_user/
// Params: id
router.post("/remove_user/", validateToken, (req, res) => {
    let id = req.body.id;
    User.findByIdAndDelete(id)
      .then((data) => {
        if(data == null) 
            res.status(404).json({ message: "User Not Found" });
        else
            res.status(201).json({ message: "User Removed Successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message, type: "danger" });
      });
  });

module.exports = router;
