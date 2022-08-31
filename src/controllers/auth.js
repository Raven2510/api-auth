const User = require('./models/auth');
const {generateAccessToken, generateRefreshToken} = require('../helpers/tokenization');

module.exports = {
    async signIn(req, res) {
        try {
            const {username, password} = req.body;

            if(!(username && password)) {
                res.status(400);
                throw new Error("Please fill all the inputs.");
            }

            const isExist = await User.find({ username, password });

            if(isExist.length == 0) {
                res.status(400);
                throw new Error("Invalid username or password.");
            }

            const payload = {
                user_id: data._id,
                username: data.username,
                email: data.email,
                role: data.role
            };

            res.cookie('access-token', generateAccessToken(payload), {
                httpOnly: true,
                expires: Date.now() + 900000
            });

            res.cookie('refresh-token', generateRefreshToken(payload), {
                httpOnly: true,
                expires: Date.now() + 86400000
            });

            res.status(200).json(data);
        } catch(err) {
            res.json({
                error: err.message
            });
        }
    },

    async signUp(req, res) {
        try {
            const {username, email, password} = req.body;

            if(!(username && email && password)) {
                res.status(400);
                throw new Error("Please fill all the inputs.");
            }

            const isExist = await User.find({ username });

            if(isExist.length > 0) {
                res.status(400);
                throw new Error("Username already used.");
            }

            const data = await User.create({
                username,
                email,
                password
            });

            if(data.length == 0) {
                res.status(500);
                throw new Error('Sign up registration failed.');
            }

            const payload = {
                user_id: data._id,
                username: data.username,
                email: data.email,
                role: data.role
            };

            res.cookie('accessToken', await generateAccessToken(payload), {
                httpOnly: true,
                expires: Date.now() + 900000
            });

            res.cookie('refreshToken', await generateRefreshToken(payload), {
                httpOnly: true,
                expires: Date.now() + 86400000
            });

            res.status(201).json(data);
        } catch(err) {
            res.json({
                error: err.message
            });
        }
    },

    home(req, res) {
        try {
            res.status(200).json({
                message: `Hello ${req.user.username}!`
            });
        } catch(err) {
            res.json({
                error: err.message
            });
        }
    }
};