const express = require('express');
const registerApi = require('./register')
const loginApi = require('./login')
const userApi = require('./user')
const postApi = require('./post')
// const emojis = require('./emojis');
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(userApi);
router.use(postApi);
// router.use('/emojis', emojis);


module.exports = router;
