const express = require('express');
const router = express.Router();
const user = require('../controllers/auth');
const authorization = require('../middlewares/authorization');

router.route('/')
    .get(user.signIn)
    .post(user.signUp);

router.route('/home')
    .get(authorization.authorize, user.home);
    
module.exports = router;