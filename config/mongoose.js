const mongoose  = require('mongoose');
const DB_URL ="mongodb+srv://pollingApi:qwertyuiop@cluster0.kl1fyn7.mongodb.net/"; // local DB url
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

