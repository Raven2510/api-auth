const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} = require('../config/env');

module.exports = {
    async generateAccessTokens(payload) {
        return new Promise((resolve, reject) => {
            try {
                const accessToken = await jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15min' });
                resolve(accessToken);
            } catch(err) {
                reject(err.message);
            }
        });
    },

    async generateRefreshToken(payload) {
        return new Promise((resolve, reject) => {
            try {
                const refreshToken = await jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });
                resolve(refreshToken);
            } catch(err) {
                reject(err.message);
            }
        });
    },

    async verifyAccessToken(accessToken, refreshToken) {
        return new Promise((resolve, reject) => {
            try {
                const isValid = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
                resolve(isValid);
            } catch {
                try {
                    const payload = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
                    const newAccessToken = await generateAccessToken(payload);
    
                    resolve(newAccessToken);
                } catch(err) {
                    reject(err.message);
                }
            }
        });
    }
};