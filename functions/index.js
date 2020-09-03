const functions = require('firebase-functions');
const express = require('express');
const cors = require ('cors');
const admin = require('firebase');
const bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json();

app.use(cors({ origin: true }));

admin.initializeApp({
    apiKey: "AIzaSyBpJcNlnOhD0vxIAT3lBlBjdkGAlOek7AM",
    authDomain: "sosp-939c2.firebaseapp.com",
    databaseURL: "https://sosp-939c2.firebaseio.com",
    projectId: "sosp-939c2",
    storageBucket: "sosp-939c2.appspot.com",
    messagingSenderId: "664393345033",
    appId: "1:664393345033:web:0272052ebc4096fcd4b0d8"
});


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.get('/addDatabase', (req,res) => {
    var reference = admin.database().ref("database");

    reference.on("queue", function(data){
        res.send(data.val());
    },
    function (error){
        res.send("Failed");
    });

    res.send(response);
});

app.post('/addDatabase', jsonParser, async (req,res) => {
   
    var db = admin.database();
    var ref = db.ref("database");

    var uniqueId = req.body.uniqueId

    var queueRef = ref.child("queue/" + uniqueId);

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours() - 3;
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    let ts = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    queueRef.set({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        timestamp: ts,
        status: false
    });

    res.send("created");
});

app.post("/updateStatus", jsonParser, async(req,res) =>{

    var dbRef = admin.database().ref("database/queue/" + req.body.uniqueId).update({status: true});

    res.send("updated")
})

exports.addCoordinates = functions.https.onRequest(app);
