const constants = require('./constants')
const { IncomingWebhook } = require('@slack/webhook');


const url = constants.incomingWebhookUrl;

const _webhook = new IncomingWebhook(url);

module.exports = function (app, reqpath) {
    app.post(reqpath, (req, res) => {
        console.dir(req.body)
        let webhookResponse = _webhook.send(req.body)
        webhookResponse.then((result) => {
            console.log(result)
            res.status(200).send('Successfully triggered')
        })
            .catch((err) => {
                console.log(err)
                res.status(500).send('Failed to send notification')
            })
    })
}