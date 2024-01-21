//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

//connect to database
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('uploads'));

//set temple engine
app.set('view engine', 'ejs');

//route prefix
app.use('', require('./routes/route'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});