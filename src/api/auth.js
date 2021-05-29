const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (userWithEmail) {
        const validPassword = await bcrypt.compare(password, userWithEmail.password);

        if (!validPassword)
            return res
                .status(400)
                .json({ message: "credentials does not match!" });

        const jwtToken = jwt.sign(
            { id: userWithEmail.id, email: userWithEmail.email },
            process.env.JWT_SECRET
        );

        res.json({ message: "Welcome Back!", token: jwtToken });
    } else {
        return res.status(400)
            .json({ message: "User doesn't exist !" });
    }
});

router.post('/register', async (req, res) => {
    const { uuid, name, email, password } = req.body

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );
    if (alreadyExistsUser) {
        return res.status(422).json({ message: "User with email already exists!" });
    }

    const newUser = new User({
        uuid, name, email, password
    })
    const savedUser = await newUser.save().catch((err) => {
        // console.log("error: ", err)
        res.status(500).json({ error: "Cannot register user at the moment" });
    })

    if (savedUser) res.json({ message: "Thanks for registering" });
});

module.exports = router;