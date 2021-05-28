const express = require('express');
const registerApi = require('./register')
const loginApi = require('./login')
const paymentApi = require('./payment')
const emojis = require('./emojis');
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
// router.use('/emojis', emojis);


module.exports = router;
