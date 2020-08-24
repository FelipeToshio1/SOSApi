const express = require('express');
const cors = require ('cors');
const admin = require("firebase-admin");

const app = express();

app.get('/', (req,res) => {
    res.send('server running');
})

app.use(cors({ origin: true }))

const config = {
    clientId: '664393345033-ul346bg6kb7b7pv71nrhedtla80o8me5.apps.googleusercontent.com',
    appId: '1:664393345033:android:06344126a9a7a14ad4b0d8',
    apiKey: 'AIzaSyBy-wrf0MgVvMtW30PtZly_R2n9l7jhchQ',
    databaseURL: 'https://sosp-939c2.firebaseio.com/',
    storageBucket: 'x',
    messagingSenderId: 'x',
    projectId: 'sosp-939c2',
    persistence: true,
}
admin.initializeApp(config);

app.post('/addDatabase', async (req,res) => {
   
    var db = admin.database();
    var ref = db.ref("queue");

    var data = {
        name: "test"
    }

    ref.push(data);
})

app.listen(3000);