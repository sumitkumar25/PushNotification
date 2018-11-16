const express = require('express');
const webPush = require('web-push');
const bp = require('body-parser');
const path = require('path');

const app = express();
// set static path

app.use(express.static(path.join(__dirname, 'client')));
// middleware
app.use(bp.json())

let vapidKeys = {
    publicKey: 'BMR4meYZs5Ctp_LxcQJLTJfflmUPZO4GXYff7dfI31V64KwDRMkap8eVEf3SKG6tIKNKPiddWMEK75deAVRpLX4',
    privateKey: 'geXyeE7jVbEESUqOnEG0qsg4fxUAw-k8p-6Zupxpc7c'
}

webPush.setVapidDetails('mailto:sumitdskumar@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);
// subscribe route

app.post('/subscribe', (req, res) => {
    // push sub obj
    const pushSubScription = req.body;

    // send 201
    res.status(201).json({})

    //payload
    const payload = JSON.stringify({
        'title': 'Colortokens',
        'text': 'lorem ipsium lorem ipsium lorem ipsium'
    })
    // Pass object into sendNotification
    webPush
        .sendNotification(pushSubScription, payload)
        .then(res => {})
        .catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => {
    console.log(`server started ${port}`)
})