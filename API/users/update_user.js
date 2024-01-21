/**
 * @fileoverview This file contains the API endpoint for edit an user by id.
 * @module API/update_user
 */

const express = require("express");
const User = require("../../models/users");
const validateToken = require("../validate_token");
const router = express.Router();

// Middleware to handle JSON data in requests
router.use(express.json());

/**
 * POST /api/update_user
 * Updates a user.
 * @name POST/api/update_user
 * @function
 */
router.post("/update_user", validateToken ,async (req, res) => {
    try {
        // Extract data from JSON input
        const { id, username, name, surname, email, phone, age, password } = req.body;
        // Update the user
        const user= await User.findById(id);
        if(!!user){
            user.name = name;
            user.email = email;
            user.phone = phone;
            user.age = age;
            user.password = password;
            user.username = username;
            user.surname = surname;            

            User.findByIdAndUpdate(id, user, { new: true })
                .then((data) => {
                    // Respond with success message
                    res.status(201).json({ message: "User Updated Successfully" });
                })
                .catch((error) => {
                    res.json({ message: error, type: "danger" });
                });
        }else{
            res.status(500).json({ message: "User not found", type: "danger" });
        }
    } catch (error) {
        // Respond with error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
