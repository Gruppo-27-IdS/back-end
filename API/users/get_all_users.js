/**
 * @fileoverview This file contains the API endpoint for retrieving all users.
 * @module API/get_all_users
 */
const express = require("express");
const User = require("../../models/users");
const router = express.Router();

// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());

/**
 * GET /get_all_users
 * Retrieves all users from the database.
 *
 * @name Get All Users
 * @route {GET} /get_all_users
 * @returns {Object[]} users - Array of user objects.
 * @throws {Object} 500 - Error object with message and type properties.
 */
router.get("/get_all_users", async (req, res) => {
    try {
        // Retrieve all users
        const users = await User.find();
        // Respond with the users in JSON format
        res.status(200).json(users);
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
