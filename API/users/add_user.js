/**
 * @fileoverview This file contains the API endpoint for adding an user.
 * @module API/add_user
 */
const express = require("express");
const User = require("../../models/users");
const router = express.Router();

// Middleware to handle JSON data in requests
router.use(express.json());

/**
 * POST /add_user
 * Add a new user to the database.
 * JSON
 */
router.post("/add_user", async (req, res) => {
    try {
        // Extract data from the POST input
        const { username, name, surname, age, phone, email, password } = req.body;

        // Check if password contains at least one capital letter, one special character, and one number
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (hasCapitalLetter && hasSpecialChar && hasNumber) {
            // Create a new user
            const newUser = new User({
                username,
                name,
                surname,
                age,
                phone,
                email,
                password,
            });

            // Save the user to the database
            await newUser.save();

            // Respond with a success message
            res.status(201).json({ message: "User Added Successfully" });
        } else {
            res.status(500).json({ message: "password is not valid", type: "danger" });
        }
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
