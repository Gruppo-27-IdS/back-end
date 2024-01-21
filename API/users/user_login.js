/**
 * @fileoverview This file contains the API endpoint for adding an user.
 * @module API/login_user
 */
const express = require("express");
const User = require("../../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to handle JSON data in requests
router.use(express.json());

/**
 * POST /login
 * login a user to the database.
 * JSON
 */
router.post('/login_user', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenziali non valide' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenziali non valide' });
      }
  
      // Puoi creare un token JWT per l'autenticazione se le credenziali sono valide
      const token = jwt.sign({username:  username}, 'ABFC', { expiresIn: 86400 });

      res.status(200).json({ message: 'Login riuscito',token, user });
    } catch (error) {
      res.status(500).json({ message: 'Errore durante il login', error: error.message });
    }
  });

module.exports = router;
