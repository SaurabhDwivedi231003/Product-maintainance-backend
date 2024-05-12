const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/product');
const zod = require("zod");

// ZOD for Validation
const signupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
});

// Signup Route
router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({
            msg: "Invalid data!"
        });
    }

    const user = await User.findOne({ username: body.username });
    if (user) {
        return res.status(400).json({
            msg: "User already exists!"
        });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const dbUser = await User.create({
        username: body.username,
        password: hashedPassword,
        email: body.email
    });

    const userId = dbUser._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully!",
        token
    });
});

// Signin Route
const signinBody = zod.object({
    email: zod.string(),
    password: zod.string(),
});

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid data!"
        });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
        return;
    }
    res.status(401).json({
        message: "Error while logging in!"
    });
});

module.exports = router;
