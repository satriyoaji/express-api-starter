const express = require('express');
const authApi = require('./auth')
const userApi = require('./user')
const postApi = require('./post')
// const emojis = require('./emojis');
const router = express.Router();

router.use(authApi);
router.use(userApi);
router.use(postApi);
// router.use('/emojis', emojis);

module.exports = router;
