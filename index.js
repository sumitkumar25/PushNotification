const express = require('express');
const webPush = require('web-push');
const bp = require('body-parser');
const path = require('path');

const app = express();
// set static path

app.use(express.static(path.join(__dirname, 'client')));
// middleware
app.use(bp.json())

const vapidKeys = webPush.generateVAPIDKeys()

webPush.setVapidDetails('mailto:sumitdskumar@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)
console.log(vapidKeys);
// subscribe route

app.post('/subscribe', (req, res) => {
    // push sub obj
    const pushSubScription = req.body;

    // send 201
    res.status(201).json({})

    //payload
    const payload = JSON.stringify({
        'title': 'Push'
    })
    // Pass object into sendNotification
    webPush
        .sendNotification(pushSubScription, payload)
        .then(res => {
            console.log('sendNotification', res)
        })
        .catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => {
    console.log(`server started ${port}`)
})