const mongoose  = require('mongoose');
const DB_URL = process.env.DB_URL_LOCAL; // local DB url
mongoose.connect(DB_URL);



const db  = mongoose.connection;

db.on('error', console.error.bind(console,"Error in connecting to db"));


db.once('open', (err) => {
    if (err) {
        console.log('Error: while opening db connection', err);
    } else {
        console.log('DB connection successfull :: MongoDB');
    }
})


module.exports = db;

