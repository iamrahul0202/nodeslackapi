const { createMessageAdapter } = require('@slack/interactive-messages');
const constants = require('./constants')
const { logger } = require('./logger')

const slackSigningSecret = process.env.signingKeySecret || constants.signingKeySecret;
const slackInteractions = createMessageAdapter(slackSigningSecret);

slackInteractions.action({ type: 'static_select' }, (payload, respond) => {
    console.log('dropdown')
    //console.dir(payload)
    logger.info(payload)
})

slackInteractions.action({ type: 'button' }, (payload, respond) => {
    console.log('button')
    logger.info(payload)
    return { text: 'Processing...' };
})
module.exports = function (app, path) {
    app.use(path, slackInteractions.requestListener());
}