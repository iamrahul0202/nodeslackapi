const { createMessageAdapter } = require('@slack/interactive-messages');
const constants = require('./constants')
const { logger } = require('./logger')
const { WebClient } = require('@slack/web-api');

const modal = require('./modal')

const slackSigningSecret = process.env.signingKeySecret || constants.signingKeySecret;
const token = process.env.token || constants.token;
const slackInteractions = createMessageAdapter(slackSigningSecret);

const web = new WebClient(token);

slackInteractions.action({ type: 'static_select' }, (payload, respond) => {
    console.log('dropdown')
    //console.dir(payload)
    logger.info(payload)
    
    console.dir(payload.actions[0].selected_option.value)
    let ack = {
        token: token,
        text: `You selected ${payload.actions[0].selected_option.value}`,
        channel: payload.channel_id
    }
    web.chat.postMessage(ack)
    // (async () => {
    //     await web.chat.postMessage(ack)
    // })()
})

slackInteractions.action({ type: 'button' }, (payload, respond) => {
    console.log('button')
    logger.info(payload)
    console.dir(payload.actions[0].value)
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