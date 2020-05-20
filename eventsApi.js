const { createEventAdapter } = require('@slack/events-api');
const constants = require('./constants')
const { logger } = require('./logger')

const slackSigningSecret = process.env.signingKeySecret || constants.signingKeySecret;
const slackEvents = createEventAdapter(slackSigningSecret);

const { WebClient } = require('@slack/web-api');
const token = process.env.token || constants.token;
const web = new WebClient(token);

slackEvents.on('message', (event) => {
    //console.dir(event)
    logger.info(event);

    if (event.client_msg_id) {
        console.log('Calling UserInfo API')

        //Received Message - ${event.text}. We will review and get back to you

        let msg = {
            token: token,
            text: `Message Received :+1: - ${event.text}.`,
            channel: event.channel
        }

        let txt = event.text
        if (txt == 'Hello' || txt == 'Hi') {
            web.users.info({
                token: token,
                user: event.user
            }).then(res => {
                msg.text = `Hey ${res.user.real_name}. This is LHNotificationBot here. :handshake:`
                web.chat.postMessage(msg)
            })
        } else if (txt.toLowerCase() == 'am i still on hold') {
            msg.text = `Yes you are still on hold`
            msg.thread_ts = event.ts
            web.chat.postMessage(msg)
        } else {
            web.chat.postMessage(msg)
        }


    }
});

module.exports = function (app, path) {
    app.use(path, slackEvents.requestListener());
}