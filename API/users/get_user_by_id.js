const express = require("express");
const User = require("../../models/users");
const validateToken = require("../validate_token");
const router = express.Router();

// Middleware per gestire i dati JSON nelle richieste
router.use(express.json());

/**
 */
router.post("/get_user_by_id", validateToken, async (req, res) => {
    const { id } = req.body;
    try {
        // Retrieve all users
        const user = await User.findById(id);
        const specialUser = {
            username: user.username,
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            age: user.age
        }
        // Respond with the users in JSON format
        res.status(200).json(specialUser);
    } catch (error) {
        // Respond with an error message
        res.status(500).json({ message: error.message, type: "danger" });
    }
});

module.exports = router;
