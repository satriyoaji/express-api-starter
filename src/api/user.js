const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

router.post('/users',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { name, email, role } = req.body

        try {
            const user = await User.create({ name, email, role })

            return res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    })

router.get('/users',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const users = await User.findAll({ include: 'posts' })

            return res.json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Something went wrong' })
        }
    })

router.get('/users/:uuid',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const uuid = req.params.uuid
        try {
            const user = await User.findOne({
                where: { uuid },
                include: 'posts',
            })

            return res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Something went wrong' })
        }
    })

router.delete('/users/:uuid',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const uuid = req.params.uuid
        try {
            const user = await User.findOne({ where: { uuid } })

            await user.destroy()

            return res.json({ message: 'User deleted!' })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Something went wrong' })
        }
    })

router.put('/users/:uuid',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const uuid = req.params.uuid
        const { name, email, role } = req.body
        try {
            const user = await User.findOne({ where: { uuid } })

            user.name = name
            user.email = email
            user.role = role

            await user.save()

            return res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Something went wrong' })
        }
    })

module.exports = router;