const express = require('express');
const userModel = require("../models/Users");  // Fix the path to User model
const bcrypt = require('bcryptjs');
const router = express.Router();

// User signup
router.post("/signup", async (req, res) => {
    // try-catch --> create user with cred [username, email, and password]
    try {
        const newUser = new userModel({
            ...req.body
        });

        await newUser.save();

        res.status(201).json({ message: 'Registered User Successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // findOne({}) the user in the database
        const user = await userModel.findOne({ username });
        // Incorrect username
        if (!user) {
            return res.status(401).json({ message: "Unable to login, incorrect username." });
        }

        // Compare password using bcrypt
        const isPassValid = await bcrypt.compare(password, user.password);

        // Incorrect password
        if (!isPassValid) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        // Success
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;