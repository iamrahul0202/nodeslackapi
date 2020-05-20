const { createMessageAdapter } = require('@slack/interactive-messages');
const constants = require('./constants')
const { logger } = require('./logger')
const { WebClient } = require('@slack/web-api');

const modal = require('./samples/modal')
const modalshortcut = require('./samples/modalshortcut')

const slackSigningSecret = process.env.signingKeySecret || constants.signingKeySecret;
const token = process.env.token || constants.token;

//syncResponseTimeout must be between 1 and 3000
const slackInteractions = createMessageAdapter(slackSigningSecret, {
    syncResponseTimeout: 3000
});

const web = new WebClient(token);

slackInteractions.action({ type: 'static_select' }, (payload, respond) => {
    console.log('dropdown')
    logger.info(payload)

    console.dir(payload.actions[0].selected_option.value)
    let ack = {
        token: token,
        text: `You selected ${payload.actions[0].selected_option.value}`,
        channel: payload.channel.id
    }
    web.chat.postMessage(ack)
})

slackInteractions.action({ type: 'button' }, (payload, respond) => {
    console.log('button')
    logger.info(payload)
    console.dir(`Button clicked with value - ${payload.actions[0].value}`)

    let ack = {
        token: token,
        text: `Thank You for acknowledgment. Here is the form....`,
        channel: payload.channel.id
    }
    web.chat.postMessage(ack)
    return web.views.open({
        token: token,
        trigger_id: payload.trigger_id,
        view: modal
    })

})

//For handling shortcuts
slackInteractions.shortcut({ callback: 'reviewform', type: 'shortcut' }, (payload) => {
    console.log(`triggerid ${payload.trigger_id}`)
    return web.views.open({
        token: token,
        trigger_id: payload.trigger_id,
        view: modalshortcut
    })
})

module.exports = function (app, path) {
    app.use(path, slackInteractions.requestListener());
}