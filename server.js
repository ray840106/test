const express = require('express');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const app = express();
const hubName = 'Sample_ChatApp';
const port = 8000;

let serviceClient = new WebPubSubServiceClient('74l6iipHbt9CoQ9G7CN6bRkaJBruGAdKCFlxJl9Jq4U=', hubName);

app.get('/negotiate', async (req, res) => {
    let id = req.query.id;
    if (!id) {
        res.status(400).send('missing user id');
        return;
    }
    let token = await serviceClient.getClientAccessToken({ userId: id });
    res.json({
        url: token.url
    });
});

app.use(express.static('public'));
app.listen(port, () => console.log('server started'));