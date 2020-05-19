const constants = require('./constants')
const { IncomingWebhook } = require('@slack/webhook');
const { logger } = require('./logger')


const url = process.env.webhookUrl || constants.incomingWebhookUrl;
const webhook = new IncomingWebhook(url);



module.exports = function (app, reqpath) {
    app.post(reqpath, (req, res) => {

        logger.info(req.body)
        let webhookUrl = req.body.url
        let webhookResponse = new IncomingWebhook(webhookUrl).send({
            text: req.body.text
        })

        webhookResponse.then((result) => {
            logger.info(result)
            res.status(200).send('Successfully triggered')
        })
            .catch((err) => {
                logger.error(err)
                res.status(500).send('Failed to send notification')
            })
    })
}