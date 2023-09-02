const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
        unique: true
    }, 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    textArea: {
        type: String,
        required: true
    },
   verificationToken: {
    type: String
   }
})

const User = mongoose.model("User", userSchema);

module.exports = User;