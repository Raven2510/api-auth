
module.exports = {
    async authorize(req, res, next) {
        try {
            const {accessToken, refreshToken} = req.cookies;

            const result = await verifyAccessToken(accessToken, refreshToken);

            req.user = result;
            next();
        } catch(err) {
            res.status(401).json({
                error: err.message
            });
        }
    }
}