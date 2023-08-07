const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0:27017/inotebook"


const connectToMongo = () => {
    // mongoose.connect(mongoURI, () => {
    //     console.log("connected to Mongo Succesfully");
    // })
    // .then(()=>{

    // })
    mongoose.connect(mongoURI, { useNewUrlParser: true }, { useUnifiedTopolgy: true});

}

module.exports = connectToMongo;