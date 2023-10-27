const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
const uri = process.env.MONGO_URL

function connectDB() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfully connected to DB")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = connectDB;