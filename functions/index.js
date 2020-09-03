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
    res.send('server running');
});

app.post('/addDatabase', jsonParser, async (req,res) => {
   
    var db = admin.database();
    var ref = db.ref("database");

    var name = req.body.name

    var queueRef = ref.child("queue/" + name);

    queueRef.set({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        timestamp: req.body.timestamp
        
    });

    res.send("created");
});

exports.addCoordinates = functions.https.onRequest(app);
