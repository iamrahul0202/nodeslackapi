const constants = require('./constants')
const { IncomingWebhook } = require('@slack/webhook');
const { logger } = require('./logger')


const url = constants.incomingWebhookUrl;

const _webhook = new IncomingWebhook(url);

module.exports = function (app, reqpath) {
    app.post(reqpath, (req, res) => {
        logger.info(req.body)
        let webhookResponse = _webhook.send(req.body)
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