const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {PORT} = require('./src/config/env');
const {connectToDb} = require('./src/config/database');

app.use(express.json());
app.use(cookieParser());

connectToDb();

app.use('/auth', require('./src/routes/auth'));

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});