const express = require("express");
const passport = require("passport");
const Post = require("../models/post");
const User = require("../models/user");
const router = express.Router();

router.post('/posts',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { userUuid, content } = req.body

        try {
            const user = await User.findOne({ where: { uuid: userUuid } })

            const post = await Post.create({ content, userId: user.id })

            return res.json(post)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    })

router.get('/posts',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const posts = await Post.findAll()

            return res.json(posts)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    })

module.exports = router;