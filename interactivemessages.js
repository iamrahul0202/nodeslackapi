const { createMessageAdapter } = require('@slack/interactive-messages');
const constants = require('./constants')
const { logger } = require('./logger')
const { WebClient } = require('@slack/web-api');
const modal = require('./modal')

const slackSigningSecret = process.env.signingKeySecret || constants.signingKeySecret;
const token = process.env.token || constants.token;
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


slackInteractions.shortcut({ callback: 'reviewform', type: 'shortcut' }, (payload) => {
    console.log(`triggerid ${payload.trigger_id}`)
    return web.views.open({
        token: token,
        trigger_id: payload.trigger_id,
        view: modal
    })
})

module.exports = function (app, path) {
    app.use(path, slackInteractions.requestListener());
}