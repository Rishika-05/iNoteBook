const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

// const mongoURI = "mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const mongoURI = process.env.DATABASE ;

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to DB successfully');
    }).catch((err) => console.log(err));
}

module.exports = connectToMongo;