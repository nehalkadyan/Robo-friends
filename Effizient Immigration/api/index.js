const express = require("express");

const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const crypto = require('crypto')
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;

const cors = require("cors")

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://kadyannehal333:nehalkadyan@cluster0.1o9cxs5.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to Mongo DB",err)
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

// function to send user details to user's mail

const sendUserDetails = async(user, email, verificationToken) => {

    

    const userEmail = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const company = user.company;
    const jobTitle = user.jobTitle;
    const textArea = user.textArea;

    // create a nodeMailer transport

    const transporter = nodemailer.createTransport({


        // configure email service
        service: "gmail",
        auth: {
            user: "kadyannehal333@gmail.com",
            pass: "gakecbchhrlgzrae",
        }
    })

    // Email Message :-
    const mailOptions = {
        from : "Effizient Immigration Inc",
        to: email, 
        subject : "Your Entered details",
        text: ` Email : ${user.email} 
                First Name: ${user.firstName}
                Last Name: ${user.lastName}
                Company : ${user.company}
                Job Title: ${user.jobTitle}
                Text Area : ${user.textarea} `,

    }

    // send the email

    try{
        await transporter.sendMail(mailOptions)
    }catch(err){
        console.log(err)
    }

}

// endpoints to register in the app

const User = require("./models/user");

app.post("/register", async(req, res) => {
    try{
       const {email, firstName, lastName, company, jobTitle, textArea} = req.body;

       //check if email is already registered
       const existingUser = await User.findOne({email});
       if(existingUser){
        return result.status(400).json({message: "Email Already Sent"});

       }

       // create a new user
       const newUser = new User({email, firstName, lastName, company, jobTitle, textArea});

       // generate and store the verification token
       newUser.verificationToken = crypto.randomBytes(20).toString("hex");

       // save the user details to the database
       await newUser.save();
       

       // send user details to the mail

       sendUserDetails(newUser,newUser.email, newUser.verificationToken);

    }catch(err){
      console.log("Error registering user", err)
      res.status(500).json({message: "Registration Failed!"})
    }
})





