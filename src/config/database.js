module.exports.connectToDb = async () => {
    try {
        const {DB_URL} = require('./env');
        await mongoose.connect(DB_URL);
        console.log("Connected to database.");
    } catch(err) {
        console.error(err.message);
    }
};