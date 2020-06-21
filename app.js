var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Message = require("./models/message");
var Project = require("./models/project");
var nodemailer = require('nodemailer');
var app = express();

var url = process.env.DATABASEURL || "mongodb://localhost:27017/portfolio";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.log("ERROR: ", err.message);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

var msg = "";

app.get("/", function(req, res){
    Project.find({}, function(err, projects){
        if(err){
            console.log(err);
        }else{
            var tempMsg = msg;
            msg = "";
            console.log("FLASH MESSAGE: "+tempMsg);
            res.render("landing", {projects: projects, message: tempMsg});
        }
    });
});

app.post("/contact", function(req, res){
    Message.create(req.body.message, function(err, message){
        if(err){
            console.log(err);
            msg = "Some error occoured. Message not sent!";
            res.redirect("/");
        }else{
            console.log(message);
        }
    });

    //NODEMAILER
    const output = `
        <p>You have new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.message.firstname} ${req.body.message.lastname}</li>
            <li>Email: ${req.body.message.email}</li>
            <li>Mobile Number: ${req.body.message.mobilenumber}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message.content}</p>
    `
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'adarshnodemailer@gmail.com',
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            refreshToken: process.env.REFRESHTOKEN,
            accessToken: process.env.ACCESSTOKEN,
        }
    });
    var mailOptions = {
        from: 'adarshnodemailer@gmail.com',
        to: 'f20180396@goa.bits-pilani.ac.in',
        subject: 'Portfolio Contact Request',
        text: ``,
        html: output
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            msg = "Some error occoured. Message not sent!";
            res.redirect("/");
        } else {
            console.log('Email sent: ' + info.response);
            msg = "Message sent!";
            res.redirect("/");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});